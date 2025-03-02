import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async ({
    name, userId
}) => {
    if (!name) {
        throw new Error('Name is required')
    }
    if (!userId) {
        throw new Error('UserId is required')
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [ userId ]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;

}

export const getAllProjectByUserId= async({userId})=>{
    if(!userId){
        throw new Error('User Id is required')
    }

    const allUserProjects = await projectModel.find({
        users:userId
    })
    return allUserProjects
}

export const addUsersToProject = async({projectId,users,userId})=>{
    if(!userId){
        throw new Error('User Id is required')
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid userId")
    }

    if(!users){
        throw new Error('User Id is required')
    }
    
    if (!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))) {
        throw new Error('Invalid User Id(s) in users array');
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project Id');
    }

    if(!projectId){
        throw new Error('Project Id is required')
    }

    const project = await projectModel.findOne({
      _id:projectId,
      users:userId
    })

    if(!project){
        throw new Error("User does not belong in this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id:projectId
    },{
      
        $addToSet:{
            users:{
                $each:users
            }
        }
        },{
            new:true //jo naya document banega doc update hone ke baad wo return karwana hai
        
    })

    return updatedProject
}

export const  getProject = async({projectId})=>{
    if(!projectId){
        throw new Error('Project Id is required')
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project Id');
    }


    const project = await projectModel.findOne({
        _id:projectId
    }).populate('users')
    return project
}