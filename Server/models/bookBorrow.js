module.exports = (sequelize, DataTypes) =>{
    const BookBorrow = sequelize.define("bookBorrow",{
        userId:{
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookTitle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return BookBorrow;

}