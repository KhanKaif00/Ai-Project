import 'dotenv/config';
import http from 'http';
import app from './app.js';    
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io =  new Server(server);

io.use((socket, next) => { // here socket is the client who is trying to connect to the server
   try{
    const token = socket.handshake.auth?.token  || socket.handshake.headers.authorization?.split(' ')[1]; // here we are trying to get the token from the client
    if(!token){
        return next(new Error("Authentication error"));
    }
   
    const decoded = jwt.verify(token,process.env.JWT_SECRET); // here we are verifying the token
    
    if(!decoded){
        return next(new Error("Authentication error"));
    }
    socket.user = decoded; // here we are attaching the user to the socket
    next();

   }catch(error){
       
    next(error);
   }
  });

//jab bhi koi new user aaega wo socket.io ke through aap ke server se connect hoga utne time pe ye event fire hoga

io.on('connection', socket  => {  // jab bh koi user connect karega toh ye event fire hoga

    console.log('a user connected'); // log a message when a user connects to your server using the socketio
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
)
