import React,{useContext, useState} from "react";
import { dbCredentialsContext } from "./App";
import { emailCredentialsContext } from "./App";


import {userCredentialsContext} from './App'

function Todo(){
    const [name,setname]=useContext(userCredentialsContext);

    const [collection,setCollection]=useContext(dbCredentialsContext);
    const [emailCredentials,setEmailCredentials]=useContext(emailCredentialsContext);

    const [localcollection,setLocalConnection]=useState(collection);
    const [textcontent,setTextContent]=useState("");


    function textChange(e){
        setTextContent(e.target.value);
    }

    function checked(index){
        const newlocalcollection=[...localcollection];
        const state=!newlocalcollection[index].checked;
        newlocalcollection[index].checked=state
        setLocalConnection([...newlocalcollection]);

        
        

        fetch("http://localhost:4000/todochecked",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization:emailCredentials
        },
        body:JSON.stringify(localcollection)
        })
    }

    function clicked(index){
        const newlocalcollection=[...localcollection];

        newlocalcollection.splice(index,1);

        console.log(newlocalcollection);

        setLocalConnection(newlocalcollection);   
        
        
        
        fetch("http://localhost:4000/todoclicked",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization:emailCredentials
        },
        body:JSON.stringify(newlocalcollection)
        })
    }

    function submitted(e){
        e.preventDefault();
        setLocalConnection([...localcollection,{text:textcontent,checked:false}]);
        setTextContent("");

        fetch("http://localhost:4000/todo",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization:emailCredentials
        },
        body:JSON.stringify({
            textcontent
        })
        })
    }

    return(
    <main className="todocontainer">
        <div className="outtodocontainer">
            <div className="intodocontainer">
                <h1>Hii, {name&&name}</h1>

                <form onSubmit={submitted}>
                    <input type="text" placeholder="Enter Here" name="textcontent" onChange={textChange} value={textcontent}></input>
                    <button type="submit" name="submitbutton">+</button>
                </form>

                <div className="todocontent">
                    {localcollection.map((data,index)=>(
                        <div key={index} className="todocontentitem">
                            <input type="checkbox" onChange={()=> checked(index)} checked={data.checked? "checked" : null}></input>
                            <button type="button" onClick={()=> clicked(index)} name="cancelbutton"><i class="fa-regular fa-trash-can"></i></button>
                            <span style={{textDecorationLine: data.checked && "line-through"}} >{data.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </main>
    );
}

export default Todo;