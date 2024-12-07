import React from 'react'
import { useState } from 'react'

export default function AddEmployee() {
  const [employeeform, setEmployeeForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
  });

  function handleSubmit(e){
    e.preventDefault();
    const url = "http://localhost:4000/employee";
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(employeeform)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Failed to send data")
      }
      return response.json();
    })
    .then((data)=>{
      console.log('data was sent successfully:', data);
    })
    .catch((err)=>{
      console.log("error",err);
    })
    setEmployeeForm({
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		});
  }
  function handleChange(e){
    const {name, value} = e.target;
    setEmployeeForm((prev)=>{
      return { ...prev, [name]:value }   
    });
  }
  return (
    <div>
      <form method='post' action='/employee' onSubmit={handleSubmit} className='employee-form'>
        <label htmlFor='first_name'>first_name</label>
        <input type = "text" id='first_name' name='first_name' value ={employeeform.first_name || ""} onChange={handleChange}/>
        <label htmlFor='last_name'>last_name</label>
        <input type = "text" id='last_name' name='last_name' value ={employeeform.last_name || ""} onChange={handleChange}/>
        <label htmlFor='email'>email</label>
        <input type = "text" id='email' name='email' value ={employeeform.email || ""} onChange={handleChange}/>
        <label htmlFor='password'>password</label>
        <input type = "text" id='password' name='password' value ={employeeform.password || ""} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  )
}
