import { useEffect, useRef, useState } from "react";
import {sendMessage, isTyping } from 'react-chat-engine';
import { PlayCircleTwoTone, PictureFilled} from '@ant-design/icons';



                            


const MessageForm = (props) => {
   const [value, setValue] = useState('');
   const { chatId, creds, typer, setTyper } = props;
   
   
  
   
   const handleSubmit =(event) => {
       event.preventDefault();
       const text = value.trim();

       if(text.length >0) sendMessage(creds,chatId, { text });

       else alert("Write something...");
      

       setValue('');

   }

   const setTyperHandler = (val) => {
            if (!typer) setTyper(val);

                setTimeout(() => {
                 setTyper(null);
                }, 1500);
    };
   const handleChange = (event) => {

       setValue(event.target.value);

       isTyping(props, chatId, (data) => setTyperHandler(data.person));

   }

   const handleUpload = (event) =>{
       
        sendMessage(creds, chatId, { files:event.target.files, text: '' } )
   }
   
   
    return(

       <form className="message-form" onSubmit={handleSubmit}  >
           <div />
           <input className="message-input"
                  placeholder="Send a Message....."
                  value = {value}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  
           />
           
           <label htmlFor="upload-button">
               <span className="image-button">
                   <PictureFilled className="picture-icon"/>
               </span>
           </label>
           <input
                type="file"
                multiple={false}
                id= "upload-button"
                style={{display:'none' }}
                onChange={handleUpload} 
                            
            />
            

            <button type="submit" className="send-button">
                < PlayCircleTwoTone className=" send-icon "                 />
            </button>
            
            

       </form>
    );
}

export default MessageForm;