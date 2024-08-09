// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000')

// const chat = () => {

//     const [message , setMessage] = useState([]);
//     const [currMessage , setCurrMessage] = useState('');

//     // For send the message
//     const sendMessage = () => {
//         if(currMessage) {
//             socket.emit('message',currMessage);
//             setCurrMessage('');
//         }
//     }

//     useEffect(() => {
//         socket.on('message',(message) => {
//             setMessage((prevMessage) => [...prevMessage,message]);
//         });
//     }, []);

//     return (
//         <div className="App">
//           <div className="messages">
//             {message.map((message, index) => (
//               <div key={index} className="message">
//                 {message}
//               </div>
//             ))}
//           </div>    
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={currMessage}
//             onChange={(e) => setCurrMessage(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       );
// }

// export default chat;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState('');

    // For sending the message
    const sendMessage = () => {
        if (currMessage) {
            socket.emit('message', currMessage);
            setCurrMessage('');
        }
    };

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    return (
        <div className="App">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={currMessage}
                onChange={(e) => setCurrMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
