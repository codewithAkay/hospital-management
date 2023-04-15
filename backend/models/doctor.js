module.exports=(sequelize,DataTypes)=>{
    const doctor=sequelize.define('doctor',{
        name:{type:DataTypes.STRING,
            allowNull:false
        },

        email:{type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
    
        password:{type:DataTypes.STRING,
        allowNull:false},

        isDoctor:{type:DataTypes.BOOLEAN,
        defaultValue:true}
        
    })
    return doctor
}