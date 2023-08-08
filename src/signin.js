import React, {useState,useContext} from "react";
import {Link,unstable_useBlocker,useNavigate} from "react-router-dom";
import {userCredentialsContext} from './App'
import { dbCredentialsContext } from "./App";
import { emailCredentialsContext } from "./App";
import Headers from "./Headers";
import Footers from "./Footers";

function Signin(){

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

    function inputClicked(e)
    {
        var component=document.getElementsByTagName("input");

        console.log(component);
    }

    function submitted(e){
        e.preventDefault();

        if(username=="" || email=="" || password=="")
        {
            setIsErr(true);
            setErrMsg("Empty Inputs Not Allowed");
            return;
        }

        fetch("http://localhost:4000/signin",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            username,
            password,
            email
        })
        })
        .then(async function(res){
            if(res.status===400){
                setIsErr(true);
                setErrMsg("User Alredy Exists");
                console.log("User Alredy Exists");
            }
            else{
                console.log("Success");
                setname(username);

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

            <main className="signcontainer">
                <div className="outerdiv">
                    <div className="innerdiv">
                    <h2>REGISTER</h2>
                    {iserr&&<p>{errormsg}</p>}
                    <form onSubmit={submitted}>
                        <label>Username</label>
                        <input type="text" placeholder="Username" name="username" onChange={usernamechange} ></input>
                        <label>Email</label>
                        <input type="email" placeholder="Email" name="email" onChange={emailChange} onClick={inputClicked}></input>
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={passwordchange} onClick={inputClicked}></input>

                        <button type="submit" name="button" id="signbutton">Sign in</button>
                    </form>

                    <p>By signing in you are accepting our</p><a href="/termsandcondition">Terms and Use of Privacy Policy</a>

                    <p>Already have an account</p><Link to="/login">Log in</Link>
                    </div>
                </div>
            </main>

            <Footers />
        </body>
    );
}

export default Signin;