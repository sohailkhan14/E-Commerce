import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [Email, setEmail] = useState('');
const [Password, setPassword] = useState('');
//useNavigate() is a predefined function and it is used to transfer data one page to another page. navigate('/') /means path
const navigate = useNavigate();
useEffect( () => {
const auth = localStorage.getItem('user');
if(auth) {
navigate('/');
}
},[])

const handleClick = async () => {
if(!Email || !Password)
{
alert("All field are required")
return;
}

let result = await fetch('http://localhost:5000/login', {
    method: 'POST',
    body: JSON.stringify({ Email, Password }),
    headers: {
    'content-Type':'application/json'
    }  
});

 result = await result.json();
console.warn(result)
if(result.auth)
{
localStorage.setItem("user", JSON.stringify(result.user));
localStorage.setItem("token", JSON.stringify(result.auth));
navigate('/')
}
else{
alert("please enter correct details");
}
}

return (
    <div className='login'>
        <h1>Login</h1>
    <input   className='inputbox'  type='text'         placeholder='enter email'          onChange={(e) => setEmail(e.target.value)} value={Email}/> 
     <input  className='inputbox'   type='password'   placeholder='enter password'        onChange={(e) => setPassword(e.target.value)} value={Password}/>
   
    <button onClick={handleClick} className="clickbutton" type="button">Login</button>
    </div>
)
}
export default Login;