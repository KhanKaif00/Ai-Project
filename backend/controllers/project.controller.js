import projectModel from '../models/project.model.js'
import * as projectService from '../services/project.service.js'
import { validationResult } from "express-validator";
import userModel from '../models/user.model.js'

export const createProjectController = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const {name} = req.body
        const loggedInUser = await userModel.findOne({email:req.user.email})
        const userId = loggedInUser._id

        const newProject = await projectService.createProject({name,userId})

        res.status(200).json({newProject})

    }catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

export const getAllProjects = async(req,res)=>{
    try{ 
        const loggedInUser = await userModel.findOne({email:req.user.email})
       
        const allUserProjects = await projectService.getAllProjectByUserId({userId: loggedInUser._id
        })
        
        return res.status(200).json({
           projects:allUserProjects
        })

    }catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }


}

export const addUserToProject = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {projectId,users} = req.body
        const loggedInUser = await userModel.findOne({email:req.user.email})

        const project = await projectService.addUsersToProject({
            users,
            projectId,
            userId:loggedInUser._id
        })

        return res.status(200).json({
            project
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:error.message})
    }
}

export const getProjectById = async(req,res)=>{
    const {projectId} = req.params 
     try {
        const project = await projectService.getProject({
            projectId
        })
        return res.status(200).json({project})
        
     } catch (error) {
        console.log(error)
        return res.status(401).json({message:error.message})
    }

}