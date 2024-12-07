import React from "react";
import { useState } from "react";
function Login(){
   const [message, setMessage] = useState("");
   const [loginForm, setLoginForm] = useState({
      email:"",
      password:""
   })
   function handleSubmit(e){
      e.preventDefault();
      const url = 'http://localhost:4000/login';
      fetch(url,{
         method:"POST",
         headers:{
            'Content-Type':"application/json"
         },
         body:JSON.stringify(loginForm)
      })
      .then((response)=>{
         if(!response.ok){
            throw new Error("failed to send the data");
         }
         return response.json();
      })
      .then((data)=>{
         console.log("data is sent successfully:",data);
         if(data.data.length > 0){
            setMessage("successfully login");
         }
         else{
            setMessage("failed to login");
         }
      })
      .catch((err)=>{
         console.log("error:",err);
      })
      setLoginForm({
			email: "",
			password: "",
		});
   }
   function handleChange(e){
      const {name, value} = e.target;
      setLoginForm(prev=>{
         return {...prev,[name]:value}
      })
   }
   return(
      <div>
         <form method = "post" action="/login" onSubmit={handleSubmit} className="login-form">
            <h1>{message}</h1>
            <label htmlFor="email">email</label>
            <input type="text" id="email" name="email" value={loginForm.email} onChange={handleChange}/>
            <label htmlFor="password">password</label>
            <input type="text" id="password" name="password" value={loginForm.password} onChange={handleChange}/>
            <button>login</button>
         </form>
      </div>
   )
}
export default Login;
