const {Sequelize,DataTypes}=require('sequelize')

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./db.db',
    logging:false
})

try {
    sequelize.authenticate()
    console.log('Connected Successsfully')
} catch (error) {
    console.log(error)

}

const db={}

db.sequelize=sequelize
db.Sequelize=Sequelize
db.patient=require('./Patients')(sequelize,DataTypes)
db.doctor=require('./doctor')(sequelize,DataTypes)
db.admin=require('./admin')(sequelize,DataTypes)
db.appointment=require('./Appoinment')(sequelize,DataTypes)


db.sequelize.sync({})

module.exports=db
