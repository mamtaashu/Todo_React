import React from "react";
import {v4 as uuid} from "uuid"

export const Todo =() =>{
    const [input,setInput]=React.useState("")
    const [data,showData]=React.useState([])
    


    const handleClick =()=>{
        console.log("upper case clicked")
        postData(input)
    }


    const getData=async()=>{
        let response=await fetch("http://localhost:8080/todo");
        let data=await response.json();
        showData(data)

    }

    const deleteData=async(id)=>{
      let data=await fetch(`http://localhost:8080/todo/${id}`,{
        method:"DELETE"

      })
      getData()



    }





    const postData=async(title)=>{
      var obj={
        id:uuid(),
        title:title

      }
      try{
       
         let response=await fetch('http://localhost:8080/todo',{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{"Content-Type":"application/json"}

         })
         
        getData();
        setInput("")
      }catch(error){
        console.log(error)
      }
    }

React.useEffect(()=>{
   getData()
},[])



    return(
        <div>
            <input  type="text" placeholder="enter your todo"   value={input}  onChange={(e)=>{setInput(e.target.value)} }/>
            <button className="btn" onClick={handleClick}> Add your todo</button>

            {
                data.map(e=>{
                    return(
                        <div>
                        <h1>Task : {e.title}</h1>
                        <button  onClick={()=>{deleteData(e.id)}} >Delete</button>
                        </div>
                    )
                })
            }

        </div>
    )
}


