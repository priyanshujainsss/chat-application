import './App.css';
import {UserContext} from './UserContext';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Home from './Components/home/Home';
import Chat from './Components/chat/Chat';
import Navbar from './Components/layout/Navbar';
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import axios from 'axios';
import {CookiesProvider,useCookies} from "react-cookie"
function App() {
  const [user,setUser]=useState(null);
  const [cookies, setCookie] = useCookies(['user']);
  useEffect(() => {
    const verifyuser=async()=>{
      try{
        const res=await axios.get("http://localhost:5000/verifyuser",{withCredentials:true})
        console.log(res)
        setUser(res.data)
      setCookie('userId', res.data._id, { path: '/'});
      setCookie('userName', res.data.name, { path: '/' });

      }
      catch(err){
        console.log(err)
      }
    }
    verifyuser();
  }, [])

  
  return (
    <Router>
    <div className="App">
     <UserContext.Provider value={{user,setUser}}>
       <CookiesProvider>
       <Navbar />
       <Switch>
         <Route exact path="/" component={Home} />
         <Route  path="/chat/:room_id/:room_name/" component={Chat}/>
         <Route exact path="/login" component={Login} />
         <Route eaxct path="/signup" component={Signup} />
       </Switch>
       </CookiesProvider>
     </UserContext.Provider>


    </div>
    </Router>
  );
}

export default App;
