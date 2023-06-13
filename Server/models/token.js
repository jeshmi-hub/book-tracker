module.exports = (sequelize, DataTypes) =>{
    const Token = sequelize.define("token", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          token: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Token;
}