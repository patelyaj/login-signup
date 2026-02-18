import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <div>
               <Link to={'/signup'}>Sign up</Link>
            </div>

            <div>
                <Link to={'/login'}>login</Link>
            </div>

        </div>
    );
}

export default Home;