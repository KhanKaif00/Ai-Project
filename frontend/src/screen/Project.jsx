import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from '../config/axios';
import { initiateSocket, receiveMessage, sendMessage } from "../config/socket";
import { UserContext } from "../context/user.context";
import Markdown from "markdown-to-jsx";

const Project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Store messages as state
  const { user } = useContext(UserContext);
  const messageBox = useRef(null);

  useEffect(() => {
    initiateSocket(project._id);

    receiveMessage('project-message', data => {
      console.log(data);
      setMessages(prevMessages => [...prevMessages, data]); // Update state with new message
    });

    axios.get(`/projects/get-project/${location.state.project._id}`)
      .then(res => {
        console.log("API Response:", res.data.project);
        setProject(res.data.project);
      })
      .catch(err => console.log(err));

    axios.get('/users/all')
      .then(res => {
        console.log("API Response:", res.data);
        setUsers(res.data.users);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]); // Scroll to bottom when messages update

  const send = () => {
    const newMessage = {
      message,
      sender: { email: user.email }
    };

    sendMessage('project-message', newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]); // Add outgoing message to state
    setMessage('');
  };

  const addCollaborators = () => {
    axios.put('/projects/add-user', {
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    })
      .then(res => {
        console.log("API Response:", res.data);
        setIsModalOpen(false);
      })
      .catch(err => console.log(err));
  };

  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      console.log(Array.from(newSelectedUserId));
      return Array.from(newSelectedUserId);
    });
  };

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute top-0">
          <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1"></i>
            <p>Add Collaborator</p>
          </button>

          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-2">
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area pt-16 pb-10 flex-grow flex flex-col h-full relative">
          <div 
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full"
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message max-w-64 flex flex-col p-2 w-fit rounded-md ${
                  msg.sender.email === user.email ? 'ml-auto bg-blue-200' : 'bg-slate-50'
                }`}
              >
                <small className="opacity-65 text-xm">{msg.sender.email}</small>
                {msg.sender._id === 'ai' ? (
                  <div 
                  className="overflow-auto bg-slate-950 text-white">

                    <Markdown className="text-sm">{msg.message}</Markdown>
                     </div>
                ) : (
                  <p className="text-sm">{msg.message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="inputField w-full flex absolute bottom-0">
            <input 
              className="p-2 px-4 border-none outline-none flex-grow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text" 
              placeholder="Type a message" 
            />
            <button 
              onClick={send}
              className="px-5 bg-slate-950 text-white"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div className={`sidePanel bg-slate-50 w-full h-full flex flex-col gap-2 absolute transition-all ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"} top-0`}>
          <header className="flex justify-end px-4 p-4 bg-slate-200">
            <button onClick={() => setIsSidePanelOpen(false)}>
              <i className="ri-close-fill"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            {project.users.map(user => (
              <div key={user._id} className="user p-2 flex gap-2 items-center">
                <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                  <i className="ri-user-fill absolute"></i>
                </div>
                <h1 className="font-semibold text-lg">{user.email}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className='p-2'>
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map(user => (
                <div 
                  key={user._id} 
                  className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.includes(user._id) ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} 
                  onClick={() => handleUserClick(user._id)}
                >
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              ))}
            </div>

            <button
              onClick={addCollaborators}
              className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
