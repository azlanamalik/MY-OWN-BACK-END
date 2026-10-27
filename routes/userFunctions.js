import express from "express"
import userBalance from "../data/user_balance.js"

//"/userFunction"
const router = express.Router()

router.post(`/deposit`, (req,res)=>{
    const deposit = req.body.amount
    if (!deposit){
        return res.status(400).json({"Error" : "issue in parsing amount"})
    }
    if (deposit < 0){
        return res.status(404).json({"Error":"negative input"})
        //ban the user honestly
    }
    const username = req.body.user.username
    if (!username || !userBalance.has(username)){
        console.log("potential middleware issue")
        return res.status(404).json({"Error" : "no user identified"})
    }
    const balance = userBalance.get(username) + deposit
    userBalance.set(username, balance)
    res.status(200).json({"Message": "Balanace Updated"})
})

export default router