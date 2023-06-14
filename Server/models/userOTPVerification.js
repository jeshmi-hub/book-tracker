module.exports = (sequelize, DataTypes)=>{
    const UserOTPVerfication = sequelize.define("otp",{
        userId: {
            type: DataTypes.INTEGER
        },
        otp: {
            type: DataTypes.STRING
        },
        expiresAt:{
            type: DataTypes.DATE
        } 
    })

    return UserOTPVerfication;

}