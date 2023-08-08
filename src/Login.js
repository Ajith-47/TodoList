import React, {useState,useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import {userCredentialsContext} from './App'
import { dbCredentialsContext } from "./App";
import { emailCredentialsContext } from "./App";
import Headers from "./Headers";
import Footers from "./Footers";

function Register(){
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [iserr,setIsErr]=useState(false);
    const [errormsg,setErrMsg]=useState("");

    const [name,setname]=useContext(userCredentialsContext);
    const [collection,setCollection]=useContext(dbCredentialsContext);
    const [emailCredentials,setEmailCredentials]=useContext(emailCredentialsContext);

    const history=useNavigate();

    function usernamechange(e){
        setUserName(e.target.value);
    }

    function passwordchange(e){
        setPassword(e.target.value);
    }

    function emailChange(e){
        setEmail(e.target.value);
    }





    function submitted(e){
        e.preventDefault();

        if(email=="" || password=="")
        {
            setIsErr(true);
            setErrMsg("Empty Inputs Not Allowed");
            return;
        }

        fetch("http://localhost:4000/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
        })
        .then(async function(res){
            if(res.status===400){
                setIsErr(true);
                setErrMsg("Invalid Username or Password");
                console.log("Invalid Username or Password");
            }
            else{
                console.log("Success");
                      

                await fetch("http://localhost:4000/todo",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:"Basic "+email+":"+password
                }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.list);
                    setname(data.username);
                    setCollection(data.list);
                    setEmailCredentials(email);
                });
                

                history("/");
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }





    return(
        <body>
            <Headers />
            <main className="logincontainer">
                <div className="logindiv">
                    <div className="innerlogindiv">
                        <h2>LOGIN</h2>
                        {iserr&&<p>{errormsg}</p>}
                        <form onSubmit={submitted}>
                            <label>Email</label>
                            <input type="email" placeholder="Email" name="email" onChange={emailChange}></input>
                            <label>Password</label>
                            <input type="password" placeholder="Password" name="password" onChange={passwordchange}></input>
                            <button type="submit" name="button">Log in</button>
                        </form>
                    </div>
                </div>
                </main>
            <Footers />
        </body>
    );
}

export default Register;