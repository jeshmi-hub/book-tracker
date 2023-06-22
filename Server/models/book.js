module.exports = (sequelize, DataTypes) =>{
    const Book = sequelize.define("book", {
        bookTitle :{
            type: DataTypes.STRING,
            allowNull: false
        },
        bookAuthor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING
        },
        available:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Book;
}