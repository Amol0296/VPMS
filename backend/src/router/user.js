const express = require('express');
const router = express.Router();
const pool = require('../database/db');
router.get('/',async function (req,res,next){
    try {
        const result = await pool.query('SELECT * FROM users');
        res.send(result.rows);
    } catch (error) {
        console.log(error);
    }
});
// INSERT INTO users ( user_id,name,email,password) VALUES ( uuid_generate_v4(),'Amol', 'amol@test.com','qwerty')
router.post('/',async function(req,res,next){
    const {username, email, password} = req.body;
    const result = await pool.query('INSERT INTO users (user_id,name,email,password) VALUES (uuid_generate_v4(),$1,$2,$3)',[username,email,password]);
    res.send(result)
})

router.patch('/',async (req,res)=>{
    console.log(req.body);
    const {username,email,password,user_id} = req.body;

    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3 WHERE user_id=$4`,[username,email,password,user_id]);
    res.send(result)

})


module.exports = router;


