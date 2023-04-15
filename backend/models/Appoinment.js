module.exports=(sequelize,DataTypes)=>{
    const appointment=sequelize.define('appointment',{
       
        name:{type:DataTypes.STRING,
        allowNull:false},
       
        email:{type:DataTypes.STRING,
            allowNull:false,
           
        },

        phone:{type:DataTypes.NUMBER,
        allowNull:false},

        date:{type:DataTypes.STRING,
        allowNull:false},

        time:{type:DataTypes.STRING,
        allowNull:false},

        reason:{type:DataTypes.STRING,
        allowNull:false},
        
        status:{type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending"   
    },

        patient_id:{type:DataTypes.STRING,
        allowNull:false}
    },{
        timestamps:false
    })
    return appointment
}