import { useState } from "react";
import axios from 'axios';

const LoginForm = () =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');


    const handleSubmit= async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "74869fe0-0cb7-4eff-bfb7-b47888babb20", 'User-Name': username, 
                                'User-Secret': password };
        
                                
        try{
            await axios.get('https://api.chatengine.io/chats', {headers: authObject });

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();

        } catch(error){
            
            setError(' OOPS... incorrect Credentials.');

        }

    }
    return(
        <div className="wrapper">
            
            <div classname="form">
                <h1 className="title" >Chat Application </h1>
                <form onSubmit={ handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
                            className="input" placeholder="UserName" required />
                    
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                            className="input" placeholder="Password" required />

                    <div align="center">
                        <button type="submit" className= "button" >
                            <span>Log In</span>
                        </button>
                    </div>
                    <div  style={{textAlign:"center"}} className="credentials">
                            <p>Test user- test_1 ; Password- 0000</p>
                            <p>Test user- test_2 ; Password- 0000</p>
                    </div>

                    <h2 className="error" > { error } </h2>

                </form>

            </div>
            
        </div>
    );

}

export default LoginForm;