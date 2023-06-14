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
    register: async(req,res)=>{
        try {
            const { firstName, lastName, username, email, password, confirmPassword,role } = req.body;
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
                role
              });

              const token = crypto.randomBytes(32).toString('hex');
              await Token.create({ userId: newUser.id, token });

              const verificationURL = `${process.env.BASE_URL}users/${newUser.id}/verify/${token}`;
              console.log(verificationURL);
              const accessToken = createAccessToken({ id: newUser.id });
              const refreshToken = createRefreshToken({ id: newUser.id });
              const result = await sendOTPVerificationEmail({ id: newUser.id, email: newUser.email });
              await sendEmail(newUser.email, 'Verify Email', verificationURL);
              
      
              res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              });
              res.json({
                accessToken,
                message: "User created successfully and Email sent successfully",
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
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'User does not exist.' });
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });
  
        const accessToken = createAccessToken({ id: user.id });
        const refreshToken = createRefreshToken({ id: user.id });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          path: '/refresh_token',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
  
        return res.json({ accessToken });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    },
    logout: async(req,res)=>{
      try{
        res.clearCookie('refreshToken', {path:'/refresh_token'})
        return res.json({msg: "Logged out"})

      }catch(err){
        return res.status(500).json({msg:err.message})
      }
    },
    refreshToken: (req,res)=>{
      try {
        const rf_token = req.cookies.refreshToken;
        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
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
    }

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await UserOTPVerfication.create({
      userId: id,
      otp: hashedOTP,
      expiresAt: Date.now() + 3600000,
    })
    await sendEmail(`${mailOptions.to}`, `${mailOptions.subject}`, `${mailOptions.html}`)
    return {
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: id,
        email
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = userCtrl;
