import React,{useContext} from "react"
import {Link} from "react-router-dom"
import Signin from './signin'
import Login from './Login'
import Todo from './Todo'
import './styles.css'
import Headers from "./Headers"
import Footers from "./Footers"

import {userCredentialsContext} from './App'


function Welcome(){
    const [name,setname]=useContext(userCredentialsContext);
    return(
        <body>
            <Headers />
            <main>
                {!name && <div className="welcomeContainerOuter">
                    <div className="welcomeContainer"> 
                        <div>
                            <h1>Welcome {name&&name}</h1>
                            
                            <Link to="/signin" className="signinButton">Signin</Link>
                            <Link to="/login" className="loginButton">Login</Link>
                        </div>
                    </div>   
                </div>    }


            {name && <Todo />}

            </main>

            <Footers/>
        </body>
    );
}

export default Welcome;