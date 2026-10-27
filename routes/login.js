import express from "express"
import userDetails from "../data/data.js"
import jsonwebtoken from "jsonwebtoken"
//"/register route"
const router = express.Router()

router.post("/", (req,res)=>{
    const {username, password} = req.body
    let jwt;
    if (!username || !password){
        const missingDetails = (!username) ? "Username" : "Pasword"
        return res.status(400).json(`Error : Please fill out ${missingDetails}`)}
    if (userDetails.has(username)){
        const val = (password === userDetails.get(username))
        if (!val){
            return res.status(401).json("Error : incorrect password")
        }else{
                userDetails.set(username, password)//add to set
                 //create the json webtoken
                jwt = jsonwebtoken.sign({username} , process.env.JWT_KEY , {expiresIn: '1h'})
        }
    }
    else{
        return res.status(401).json("Error : Register first")
    }
    res.status(200).json( {"Token": jwt})
    })



export default router