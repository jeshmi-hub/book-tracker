module.exports = (sequelize, DataTypes) => {
    const BookBorrow = sequelize.define("bookBorrow", {
      userId: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bookTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cart: {
        type: DataTypes.STRING,
        get() {
          const value = this.getDataValue("cart");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          this.setDataValue("cart", JSON.stringify(value));
        },
      }
    });
  
    return BookBorrow;
  };
  