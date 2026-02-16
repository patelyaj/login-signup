import React from 'react';

function Signup() {
    const handleSignup = ()=>{}
    return (
        <div>
            <form action="" onSubmit={handleSignup}>
                <label htmlFor="username">Username</label>
                <input className="username" placeholder='enter username'></input>

                <br />

                <label htmlFor="">Mobile no.</label>
                <input type="number" placeholder='enter 10 digits mobile no.'/>

                <input type="email" placeholder='enter email'/>

                <input className="password"></input>

                <button type='submit'>signup</button>
            </form>
        </div>
    );
}

export default Signup;