module.exports=(sequelize,DataTypes)=>{


    const patient=sequelize.define('patient',{
        id:{type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true},
       
        name:{type:DataTypes.STRING,
        allowNull:false,
        },
        
        email:{type:DataTypes.STRING,
        allowNull:false,
        unique:true},
        
        password:{type:DataTypes.STRING,
        allowNull:false},
        
        isPatient:{type:DataTypes.BOOLEAN,
        defaultValue:true
        }
        
    })
    return patient
}