import 'dotenv/config';
import http from 'http';
import app from './app.js';    
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { generateResult } from './services/ai.service.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Ensure it matches your frontend URL
      credentials: true
    }
  });
  
io.use(async(socket, next) => { // here socket is the client who is trying to connect to the server
   try{


    const token = socket.handshake.auth?.token  || socket.handshake.headers.authorization?.split(' ')[1]; // here we are trying to get the token from the client
    const projectId = socket.handshake.query.projectId; // here we are trying to get the projectId from the client

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid projectId"));
    }
    socket.project = await projectModel.findById(projectId); // here we are attaching the project to the socket
    


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

   socket.roomId = socket.project._id.toString(); // here we are getting the projectId from the socket

    console.log('a user connected'); // log a message when a user connects to your server using the socketio
     
    socket.join(socket.roomId); // here we are joining the user to the project room
    console.log("User joined room:", socket.roomId);


    socket.on('project-message', async data=>{
      const message = data.message;
      console.log(message);
     
      const aiIsPresentInMessage = message.includes('ai'); // here we are checking if the message contains the word 'ai' or not
      socket.broadcast.to(socket.roomId).emit('project-message',data); // here we are broadcasting the message to all the users in the project room


      if(aiIsPresentInMessage){
          const prompt = message.replace('ai',''); // here we are removing the word 'ai' from the message
          const result = await generateResult(prompt); // here we are generating the result using the prompt
          
          io.to(socket.roomId).emit('project-message', 
            {
              message: result,
              sender:{
                  _id: 'ai',
                  email: 'AI'
              }
            
            }); // here we are emitting the result to all the users in the project room
        return;
      } 
      console.log(data);

    })
    
  socket.on('disconnect', () => { 
    console.log('user disconnected'); // log a message when a user disconnects from your server using the socketio
    socket.leave(socket.roomId); // here we are leaving the user from the project room
  });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
)
