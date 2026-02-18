import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/Features/authSlice';
function Dashboard() {
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    
    const handleLogout = async ()=>{
        const res = await dispatch(logoutUser());
        console.log("logout response",res);
    }
    return (
        <div>
            <h1>{user.username}</h1>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}

export default Dashboard;