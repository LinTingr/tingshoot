const express = require("express");
const route = express.Router();
const userModel = require("../model/user.js")

route.post("/", async(req, res)=>{
    try{
        console.log(req.body)
        let name = req.body.name;
        let account = req.body.account;
        let password = req.body.password;
        let result = await userModel.checkAccount(account);
        if (result){
            data = {
                "ok":true,
                "message":"帳號已有人使用 ! "
            }
            res.status(400).json(data)
        }else{
            await userModel.signUp(name, account, password)
            data = {
                "ok":true,
                "message":"註冊成功 ! "
            }
            res.status(200).json(data)
        }

    }catch{
        data = {
            "error":true,
            "message":"伺服器錯誤"
        }
        res.status(500).json(data)
    }
    
})

route.put("/", async(req, res)=>{
    try{
        // console.log(req.body)
        let account = req.body.account;
        let password = req.body.password;
        const result = await userModel.signIn(account, password)
        console.log(result)
        if (result){
            data = {
                "ok":true,
                "message":"登入成功 ! "
            }
            res.status(200).json(data)
        }else{
            data = {
                "error":true,
                "message":"帳號或密碼錯誤 ! "
            }
            res.status(403).json(data)
        }
    }catch{
        data = {
            "error":true,
            "message":"伺服器錯誤"
        }
        res.status(500).json(data)
    }
    
})

module.exports = route