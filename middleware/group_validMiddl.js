const {groupValidator} = require('../validator/group_valid')
const CustomAPIError = require('../errors/custom-api')

module.exports.groupValidate = (req, res, next) => {
try{
    const {error} = groupValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw new CustomAPIError(error.message)
}
}