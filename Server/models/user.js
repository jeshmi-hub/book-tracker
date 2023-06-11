 module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user", {
        firstName:{
            type: DataTypes.STRING,
            allowNull : false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        password:{
            type: DataTypes.STRING
        },
        confirmPassword:{
            type: DataTypes.STRING
        },
        role:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    return User;
 }