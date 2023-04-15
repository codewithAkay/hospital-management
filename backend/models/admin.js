module.exports=(sequelize,DataTypes)=>{
    const admin=sequelize.define('admin',{
        email:{type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
    
        password:{type:DataTypes.STRING,
        allowNull:false},

        isAdmin:{type:DataTypes.BOOLEAN,
        defaultValue:true}
        
    })
    return admin
}