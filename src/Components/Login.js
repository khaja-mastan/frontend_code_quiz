import React, { useRef, useState } from "react";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";

function Login(){
    const[userId , setUseRId] = useState('');
    const[password , setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const inputRef = useRef(null)
    const dispatch = useDispatch();

    const submit = async (e) => {
      e.preventDefault();
      console.log("submited");
      if(inputRef.current?.value){
          dispatch(setUserId(inputRef.current?.value))
      }
      try {
        const response = await axios.post('http://localhost:8001/login',
         { userId, password });
        const data = response.data;
        console.log(data);
  
        if (data === 'exist') {
            navigate("/home")
          console.log('Login successful');
        } else if (data === 'notexist') {
          setError('Invalid credentials. Please try again.');
        }
      } catch (error) {
        setError('Something went wrong. Please try again later.');
        console.error(error);
      }
      console.log(error);
    };

   
    

    return(
        <>
        <div className="login">
            <div className="top">
                <div className="tamplate">
                    <span >
                        <img className="logo" src={require("../Components/Images/logo.png")} height={72} width={70}/>
                    </span>
                   
                </div>
                <h1 id="heading">Thank you please enter your login credential</h1>
            </div>
            <div className="box">
               <div id="up">
                <h2 id="up-h2">User ID  : </h2>
                <input id="up-in" type="text" ref={inputRef} value={userId} onChange={(e)=>setUseRId(e.target.value)}/>
               </div>
               <div id="down">
                <h2 id="down-h2">Password : </h2> 
                <div className="password-container">

                <input id="down-in" type={showPassword?'text':'password'} 
                value={password}  onChange={(e) => setPassword(e.target.value)} />
                <i id="togglePassword" class={`fa ${showPassword ? 'fa-eye':'fa-eye-slash'}`}
                   onClick={()=>setShowPassword((prevShow)=> !prevShow)}></i> <br/>             
                   </div>
               </div>
                <button className="button" onClick={submit}>Submit</button>
            </div>
        </div>
        
        </>
    )
}
export default Login;