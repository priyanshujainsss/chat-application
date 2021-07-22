import React,{useState} from "react";
import axios from "axios"
import { useHistory } from "react-router";
const Signup = () => {
    const [name,setname]=useState("");
    const[email,setemail]=useState("");
    const [password,setpassword]=useState("")
    const [nameerror,setnameerror]=useState("");
    const[passworderror,setpassworderror]=useState("");
    const [emailerror,setemailerror]=useState("")
    const history=useHistory();
    const handleSubmit=(e)=>{
       e.preventDefault();
      axios.post("http://localhost:5000/signups",{name,email,password})
      .then(response=>{console.log(response)
     history.push(("/login"))
    })
      .catch(err=>{console.log("error",err.response.data.error)
          setnameerror(err.response.data.error.name)
          setpassworderror(err.response.data.error.password)
          setemailerror(err.response.data.error.email)
    })
    }
  
     
  return (
    <div>
      <div className="row">
        <form className="col s12 " onSubmit={handleSubmit} >
          <div className="row s12 m12"></div>
          <div className="row">
            <div className="input-field col s12">
              <input id="name" type="text" className="validate" value={name} onChange={(e)=>setname(e.target.value)} />
              <label htmlFor="name">Name</label>
              <div style={{color:"red"}} >{nameerror ? nameerror :null}</div>
            </div>
          </div>
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

          <button className="btn" >Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
