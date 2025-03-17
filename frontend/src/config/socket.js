import socket from 'socket.io-client';

//here apun mainly 3 functions use karenge
//1. websocket connection banaaega aapke client aur server ke beech me
//2. jo receive karega data from server
//3. jo send karega data to server


let socketInstance = null; // here we are creating a socket instance (client aur server ke beech me jo connection banega usko represent karega ye variable)

export const initiateSocket = (projectId) => {
    socketInstance = socket(import.meta.env.VITE_URL_API,{
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
           projectId
        }
    }); // here we are creating a socket connection between client and server
     return socketInstance

} // here we are creating a function to initiate the socket connection

export const receiveMessage =(eventName,cb)=>{
     socketInstance.on(eventName,cb) 
}

export const sendMessage = (eventName,cb)=>{
    socketInstance.emit(eventName,cb) 
}