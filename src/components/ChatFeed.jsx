import { useEffect, useRef, useState } from "react";

import MessageForm from './MessageForm';

import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import axios from 'axios';
import LoginForm from './LoginForm';



const Chatfeed = (props) => {

        const { chats, activeChat, userName, messages } = props;

        const chat = chats && chats[activeChat];

        const [typer,setTyper]= useState(null);

        

       

        const renderReadReceipts = (message, isMyMessage) =>{
          return( chat.people.map((person, index ) => person.last_read === message.id && (
                <div 

                    key = {`read_${index}`}
                    className="read-receipt"
                    style={{ 
                                float: isMyMessage ?'right':'left',
                                backgroundImage: person.person.avatar && ` url(${person.person.avatar})`,
                            }}
                         
                                 
                />
                
            ))
          )};
          const messageEndRef = useRef(null);
   
             useEffect(() => {
                                messageEndRef.current && messageEndRef.current?.scrollIntoView({behavior:"smooth"});
                            },[messages]); 

        const renderMessages = () => {

            const keys = Object.keys(messages);

            return keys.map(( key , index) =>{
                const message = messages[key];
                const lastMessageKey = index === 0 ? null : keys[index - 1];
                const isMyMessage = userName === message.sender.username;
            

                return(

                    <div key = {`msg_${index}`} style = {{width :'100%' }}  >
                        <div className="message-block" >
                            {

                                isMyMessage ? <MyMessage message={message} /> 
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>


                            }
                             
                            

                        </div>
                        <div  className="read-receipts" style={{ marginRight: isMyMessage? '18px' : '0px', marginLeft: isMyMessage? '0px' : '68px' }} > 
                                {renderReadReceipts( message, isMyMessage )}
                                
                        </div>
                        
                    </div>
                )
            })
        }
        const handleLogout= async (e)=>{
           const username = LoginForm.userName;
            const password = LoginForm.password;
            e.preventDefault();

            const authObject = { 'Project-ID': "74869fe0-0cb7-4eff-bfb7-b47888babb20", 'User-Name': username, 
                                    'User-Secret': password };
            
                                    
                             
                localStorage.removeItem ('username', username);
                localStorage.removeItem('password', password);
    
                window.location.reload();
    
            
        }
        

        if(!chat) return 'Loading...';

        return(

            <div className="chat-feed">
               
                <div className="chat-title-container">
                    <div className="chat-title">
                        {chat.title}
                        <button style={{marginLeft:"20px", backgroundColor:"#FCA5A5", fontWeight:"bold"}} onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="chat-subtitle" >
                        {chat.people.map((person) => ` ${person.person.username}`)}
                    </div>
                </div>
                {renderMessages()}
                
                <div style={{height: '100px' }} ref= {messageEndRef}>
                    {typer? `${typer} typing...`:null}
                </div>
                <div className="message-form-container" >
                    <MessageForm {...props} chatId={activeChat}  ref= {messageEndRef} typer={typer} setTyper={setTyper}/>
                </div>
                
            </div>
            
        );
}

export default Chatfeed;