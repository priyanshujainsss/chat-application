import React, { useState,useContext } from 'react'
import {Redirect} from "react-router-dom"
import axios from "axios";
import { UserContext } from '../../UserContext';
const Login = () => {
  const { user, setUser } = useContext(UserContext);
    const[email,setemail]=useState("");
    const [password,setpassword]=useState("")
    const[passworderror,setpassworderror]=useState("");   
    
    const [emailerror,setemailerror]=useState("")
    // const history=useHistory();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",{email,password},{withCredentials:true})
        .then(response=>{console.log("response",response)
        if(response.status === 201){
            setemailerror(response.data);
         setpassworderror(response.data);
         
        }
        if(response.status === 200){
            setemailerror("");
            setpassworderror("");
            setUser(response.data.find[0]);
            window.location.reload();
        }
     })
        .catch(err=>{console.log({err})
        //  setemailerror(err.response.data);
        //  setpassworderror(err.response.data)
        
        })
    }
    if(user){
        return <Redirect to="/" />
    }
    
    return (
        <div>
      <div className="row">
        <form className="col s12 " onSubmit={handleSubmit} >
        
          
          <div className="row">
            <div className="input-field col s12">
            <input id="email" type="email" className="validate" value={email} onChange={(e)=>setemail(e.target.value)}/>
              <label htmlFor="email">Email</label>
              <div style={{color:"red"}}>{emailerror ? emailerror :null}</div>

            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
            <input id="password" type="password" className="validate" value={password} onChange={(e)=>setpassword(e.target.value)}/>
              <label htmlFor="password">Password</label>
              <div style={{color:"red"}}>{passworderror ?passworderror:null}</div>

            </div>
          </div>
          <button className="btn" >Login</button>
        </form>
      </div>
    </div>
    )
}

export default Login
