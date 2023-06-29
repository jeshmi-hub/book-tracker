const db = require("../models");
const User = db.users;
const Token = db.token;
const UserOTPVerfication = db.otp;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');

const userCtrl = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, username, email, password, confirmPassword, role,verified } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ msg: "User already exists." });
  
      if (password === confirmPassword) {
        const hashedPassword = bcrypt.hashSync(password, 12);
        const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, 12);
        const newUser = await User.create({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
          role,
          verified
        });
  
        const token = crypto.randomBytes(32).toString('hex');
        await Token.create({ userId: newUser.id, token });
  
        const verificationURL = `${process.env.BASE_URL}users/${newUser.id}/verify/${token}`;
        console.log(verificationURL);
        const accesstoken = createAccessToken({ id: newUser.id });
        const refreshtoken = createRefreshToken({ id: newUser.id });
  
        const result = await sendOTPVerificationEmail({ id: newUser.id, email: newUser.email, res });

  
        res.cookie('refreshtoken', refreshtoken, {
          httpOnly: true,
          path: '/refresh_token',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
  
         return res.json({
          accesstoken,
          message: "User created successfully and Email sent successfully",
          user_id:newUser.id,
          ...result
        });
      } else {
        return res.status(500).json({ msg: "Password and confirm password do not match" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    login: async (req, res) => {
      try {
        const loginObject ={
          email : req.body.email,
          password : req.body.password

        } 
        if(!loginObject.email || !loginObject.password){
          return res.status(500).json("Input all fields")
        }
        const existingUser = await User.findOne({where: {email: loginObject.email}})
        if(!existingUser){
          return res.status(500).json("User does not exist")
        }else{
          try{
            if(existingUser.password, bcrypt.compareSync(loginObject.password, existingUser.password)){
              if(existingUser.verified === false){
                return res.status(400).json({msg:"Verify Email first"})
              }else{
                const accesstoken = createAccessToken({ id: existingUser.id });
                const refreshtoken = createRefreshToken({ id: existingUser.id });
          
                res.cookie('refreshtoken', refreshtoken, {
                  httpOnly: true,
                  path: '/refresh_token',
                  maxAge: 7 * 24 * 60 * 60 * 1000,
                });
          
                 return res.json({refreshtoken, accesstoken, msg:"Logged in successfully"});
              }
            }

          }catch(err){
            throw new Error(err.msg);
          }
        }
        
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
    ,
    logout: async(req,res)=>{
      try{
        res.clearCookie('refreshtoken', {path:'/refresh_token'})
        return res.json({msg: "Logged out"})
      }catch(err){
        return res.status(500).json({msg:err.message})
      }
    },
    refreshToken: (req,res)=>{
      console.log("rrequest>>>>>>>",req)
      try {
        const rf_token = req.body.refreshToken;
        console.log("refresh token",rf_token)
        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: err})
            const {id} = user

            const accesstoken = createAccessToken({id})
            console.log({id})

            return res.json({accesstoken, refreshtoken: rf_token})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    },

    verifiedVerification: async(req,res)=>{
      try{
        const { userId, token } = req.params;
        console.log(userId)
        const user = await User.findByPk(userId);
        if(!user){
          return res.status(400).json({msg:"Invalid link"});
        }

        const tokenEntry = await Token.findOne({where: { userId, token }});
        if(!tokenEntry){
          return res.status(400).json({msg: "Invalid link"});
        }

        await User.update({verified: 1}, {where: {id: userId}});

        await tokenEntry.destroy();
        return res.json('Email verified successfully');

      }catch(err){
         res.status(500).json({msg: 'Internal server error'});

      }
    },
  verifyOTP: async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ msg: "Empty OTP details are not allowed" });
    } else {
      const userOTPVerificationRecord = await UserOTPVerfication.findOne({
        where: { userId }
      });

      if (!userOTPVerificationRecord) {
        return res.status(400).json({ msg: "The account is invalid or has already been verified. Please sign up or login." });
      } else {
        const { expiresAt, otp: hashedOTP } = userOTPVerificationRecord;

        if (expiresAt < Date.now()) {
          await UserOTPVerfication.destroy({ where: { userId } });
          return res.status(400).json({ msg: "The record has expired. Please request a new OTP." });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            return res.status(400).json({ msg: "The OTP is invalid" });
          } else {
            await User.update({ verified: 1 }, { where: { id: userId } });
            await UserOTPVerfication.destroy({ where: { userId } });
            return res.json({
              status: "VERIFIED",
              message: "User email has been verified successfully"
            });
          }
        }
      }
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message
    });
  }
},
resendOTPVerificationCode: async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ msg: "Empty user details are not allowed" });
    } else {
      await UserOTPVerfication.destroy({ where: { userId } });
      sendOTPVerificationEmail({ id: userId, email});
      res.json({
        status: "Success",
        message: "Otp has been sent to your email"
      })
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      message: err.message,
    });
  }
},
getOneUser: async(req,res)=>{
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password', 'confirmPassword'] }, // Excluding the 'password' field
    });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

},
getAllUser: async(req,res)=>{
  try{
    const users = await User.findAll();
    return res.status(200).json(users);
  }catch(err){
    return res.status(500).json({msg: err.message});
  }
},
updateUser: async(req,res)=>{
  try{
    const patchObject = req.body;
    const{firstName, lastName, username, email} = patchObject
    const updateUser = await User.update(patchObject,{
      where: {id: req.params.id},
    });

    res.status(200).json(updateUser);

  }catch(err){
    res.status(500).json({msg:err.message});

  }
  
}


}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

const sendOTPVerificationEmail = async ({ id, email }) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter ${otp} in the app to verify your email address and complete your registration process.</p><p>The code <b>expires in 1 hour</b>.</p>`,
    };

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await UserOTPVerfication.create({
      userId: id,
      otp: hashedOTP,
      expiresAt: Date.now() + 3600000,
    });

    await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);

    return {
      status: "PENDING",
      message: "Verification OTP email sent",
      data: {
        userId: id,
        email,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userCtrl;
