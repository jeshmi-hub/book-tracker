module.exports = (sequelize, DataTypes) =>{
    const Review = sequelize.define("review", {
         userId:{
            type: DataTypes.INTEGER
         },
         feeback:{
            type: DataTypes.TEXT,
            allowNull: false
         },
         image:{
            type: DataTypes.STRING
         }
    });
    return Review;
}