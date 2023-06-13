module.exports = (sequelize, DataTypes)=>{
    const UserOTPVerfication = sequelize.define("otp",{
        id: {
            type: DataTypes.INTEGER
        },
        otp: {
            type: DataTypes.String
        }
    })

    return UserOTPVerfication;

}