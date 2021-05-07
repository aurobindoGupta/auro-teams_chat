import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import './App.css';



const App = () => {

    return(
        <ChatEngine
            height= "100vh"
            projectID = "74869fe0-0cb7-4eff-bfb7-b47888babb20"
            userName="auro"
            userSecret= "1234"
            renderChatFeed = {(chatAppProps) => <ChatFeed { ...chatAppProps} /> } 
        />
    );
}


export default App;

