const {studentValidator} = require('../validator/student_valid')
const CustomAPIError = require('../errors/custom-api')

module.exports.studentValidate = (req, res, next) => {
try{
    const {error} = studentValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw CustomAPIError(error.message)
}
}