const dbConfig = require('../config/db-config');
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.DB_USER, dbConfig.DB_PASSWORD,{
    host : dbConfig.DB_HOST,
    dialect : dbConfig.dialect,
    operatorsAliases: false,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle 
    }
});

sequelize.authenticate()
.then(()=>{
    console.log("connected..")
})
.catch(err=>{
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user')(sequelize, DataTypes)
db.token = require('./token')(sequelize, DataTypes)
db.otp = require('./userOTPVerification')(sequelize, DataTypes)
db.book = require('./book')(sequelize, DataTypes)
db.review = require('./review')(sequelize, DataTypes)

db.users.hasOne(db.token, {foreignKey: 'userId', as: 'token'});
db.users.hasOne(db.otp, {foreignKey: 'userId', as:'otp'});
db.users.hasMany(db.review,{foreignKey: 'userId'})
db.review.belongsTo(db.users,{foreignKey: 'userId'});



db.sequelize.sync({force: false})
.then(()=>{
    console.log('yes re-sync is done!')
})

module.exports = db
