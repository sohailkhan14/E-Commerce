import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] =useState('');


    const navigate = useNavigate();
    useEffect( () => {
    const auth = localStorage.getItem('user'); 
    if(auth)
    {
    navigate('/')
    }
    },[]);     

    const collectdata = async()  => {
        if (!Name || !Email || !Password) {
  alert("All fields are required");
  return;
}
        console.warn(Name,Email,Password)
        let result = await fetch('http://localhost:5000/register',{
            method:'POST',
            body: JSON.stringify({Name,Email,Password}),
            headers: {
                'Content-Type':'application/json'
            },
        });

        result = await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));    
        localStorage.setItem("token",JSON.stringify(result.auth));

        if(result)
        {
            navigate('/')
        }

    }

    return(
    <div className="register">
<h1>Register</h1>
<input type='text' className="inputbox" value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'></input>

<input type='text' className="inputbox" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'></input>

<input type='password' className="inputbox" value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'></input>

<button onClick={collectdata} type="button" className="clickbutton">SignUp</button>
    </div>
    )
}
export default SignUp;