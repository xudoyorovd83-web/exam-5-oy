const joi =require("joi")
const categoryValidator=(data)=>{
    const schema =joi.object({
        name:joi.string().required(),
        imageUrl:joi.string().required()
      
    })
    return schema.validate(data)

}
module.exports=categoryValidator