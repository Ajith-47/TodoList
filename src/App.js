import React,{useState,createContext}  from "react";
import {Route,Routes} from "react-router";
import Welcome from './Welcome'
import Login from './Login'
import Signin from './signin'

export const userCredentialsContext=React.createContext();
export const dbCredentialsContext=React.createContext();
export const emailCredentialsContext=React.createContext();

function App(){
  const userCredentialsState=useState(null);
  const dbCredentialsState=useState(null);
  const emailCredentialsState=useState(null);

  return (
    <div>
      <userCredentialsContext.Provider value={userCredentialsState}>
        <dbCredentialsContext.Provider value={dbCredentialsState}>
          <emailCredentialsContext.Provider value={emailCredentialsState}>
            <Routes>
              <Route path="/" element={<Welcome />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </emailCredentialsContext.Provider>  
        </dbCredentialsContext.Provider>
      </userCredentialsContext.Provider>
    </div>
  );
}

export default App;