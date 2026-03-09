const joi =require("joi")
const carValidator=(data)=>{
    const schema =joi.object({
        model:joi.string().required(),
        tanirovka:joi.string().required(),
        motor:joi.string().required(),
        year:joi.number().required(),
        color:joi.string().required(),
        price:joi.number().required(),
        dictance:joi.number().default(),
        GearBook:joi.string().required(),
        Desecription:joi.string.required(),
        imageUrl:joi.string().required()
      
    })
    return schema.validate(data)

}
module.exports=carValidator