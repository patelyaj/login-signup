// import React, { useState } from 'react';

function Login() {
    // const [data,setdata] = useState({email : null,password : null});


    const handleChange = (e)=>{
        // console.log(e.target.value);
        // setdata({...,[e.target]:e.target.value});
    }
    
    const handleLogin = ()=>{}
    return (
        <div>
            <form action="" onSubmit={handleLogin}>
                <input type="email" placeholder='enter email' name="email" onChange={(e)=>handleChange()} value={data.email}/>

                <input className="password" placeholder='enter password' name='password' onChange={(e)=>handleChange()} value={data.password}></input>

                <button>login</button>
            </form>
        </div>
    );
}

export default Login;