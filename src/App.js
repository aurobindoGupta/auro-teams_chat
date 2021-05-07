import { ChatEngine } from 'react-chat-engine';
import LoginForm from './components/LoginForm';

import ChatFeed from './components/ChatFeed';
import './App.css';



const App = () => {

    if(!localStorage.getItem('username')) return <LoginForm />

    return(
        <ChatEngine
            height= "100vh"
            projectID = "74869fe0-0cb7-4eff-bfb7-b47888babb20"
            userName={localStorage.getItem('username')}
            userSecret= {localStorage.getItem('password')}
            renderChatFeed = {(chatAppProps) => <ChatFeed { ...chatAppProps} /> } 
        />
    );
}


export default App;

