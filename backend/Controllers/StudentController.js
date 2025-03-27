const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const FormModel = require('../Models/Students');


const login = async(req,res)=>{
    try {
        const {email,grNumber} = req.body;
        const user = await FormModel.findOne({email});

        const errorMsg = "Auth failed. Email or Password is wrong."
        if(!user){
            return res.status(403)
                .json({message:errorMsg,success:false});
        }
        //Password checking                from client     from database
        //const isPAssEqual = await compare(grnumber,      Student.grnumber);
        //if password is wrong
        //if(!isPAssEqual){
        //    return res.status(403)
        //        .json({message:errorMsg,success:false});
        //}
        if (grNumber !== user.grNumber) {
            setError("Passwords do not match!");
          } else {
            console.log("✅ Passwords match. ");
          }

        //if password is right
        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id}, //payload 
            process.env.JWT_SECRET, 
            {expiresIn : '24h'}
        )        
        //sending jwtToken as responce
        res.status(200)
            .json({message:'Login Successfully',
                success:true,
                jwtToken,
                email,
                name : user.name,
                _id : user._id
            });
    } catch (err) {
        res.status(500)
            .json({message:'Internal server error',success:false});
            console.log("Error",err);
    }
}

module.exports = {
    login
}