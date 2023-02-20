const express = require("express");
const route = express.Router();
const userModel = require("../model/userdb.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const secret = "jwtsecret"
const saltRounds = 10;

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
            bcrypt.hash(password, saltRounds, async(error, hashpassword)=>{
                if(error){

                }else{
                    console.log(hashpassword)
                    await userModel.signUp(name, account, hashpassword)

                }
            })
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
        const account = req.body.account;
        const password = req.body.password;
        const result = await userModel.signIn(account)
        // console.log(result)
        const setcookie = {
            "id":result.userid,
            "username":result.username,
            "useraccount":result.account
        }
        bcrypt.compare(password, result.userpassword, (err, resu) => {
            if (err) {
                console.error(err);
                data = {
                    "error":true,
                    "message":"伺服器錯誤"
                }
                res.status(500).json(data)
            } else {
                if(resu){
                    data = {
                        "ok":true,
                        "user":setcookie,
                        "message":"登入成功 ! "
                    }
                    const token = jwt.sign(setcookie, secret)
                    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 3600000 * 24 * 1) })
                    res.status(200).json(data)
                }else{
                    data = {
                        "error":true,
                        "message":"帳號或密碼錯誤 ! "
                    }
                    res.status(403).json(data)
                }
            }
        })
    }catch{
        data = {
            "error":true,
            "message":"伺服器錯誤"
        }
        res.status(500).json(data)
    }
    
})
route.get("/", (req, res)=>{
    const cookie = req.headers.cookie.replace("token=", "")
    if(cookie){
        jwt.verify(cookie, secret, (err, decoded) => {
            if (err) {
                console.error(err);
            } else {
                console.log(decoded);
                data = {
                    "ok":true,
                    "user":decoded,
                    "message":"歡迎回來 ! "
                }
                res.status(200).json(data)
            }
        });

    }
})

module.exports = route