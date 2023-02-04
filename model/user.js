const promisePool = require("../model/shootdb.js")

const userModel = {
    signIn: async(account, password) => {
        const con = await promisePool.getConnection()
        try{
            const sql = "SELECT * FROM shootuser WHERE useraccount = ? and userpassword =?"
            let params = [account, password];
            const [[result]] = await con.query(sql, params);
            return result
        }finally{
            con.release()
        }
    },
    checkAccount: async(account) =>{
        const con = await promisePool.getConnection()
        try{
            let sql = "SELECT useraccount from shootuser where useraccount = ?;"
            let [[result]] = await promisePool.query(sql, account);
            return result
        }finally{
            con.release()
        }
    },
    signUp: async(name, account, password) =>{
        const con = await promisePool.getConnection()
        try{
            let sql = "INSERT INTO shootuser(username, useraccount, userpassword) values (?, ?, ?);"
            let params = [name, account, password];
            await promisePool.query(sql, params);
        }finally{
            con.release()
        }

    }
} 
module.exports = userModel