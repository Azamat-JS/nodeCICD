const Appeal = require('../models/appeals_schema')
const NotFoundError = require("../errors/not-found");
const BadRequestError = require('../errors/bad-request')
const {StatusCodes} = require('http-status-codes')


const writeAppeal = async(req, res) => {
    const appeal = await Appeal.create(req.body)
    if(!appeal){
        throw BadRequestError('Please provide requirements')
    }
    res.status(StatusCodes.CREATED).json({message: 'appeal created successfully', appeal})
}

const getAllAppeals = async(req, res)=> {
    const appeals = await Appeal.find()
    res.status(StatusCodes.OK).json(appeals)
}

const getTodaysAppeals = async(req, res) => {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const appeals = await Appeal.find({
        createdAt: {$gte: startOfDay, $lte: endOfDay}
    })
    if(!appeals){
        res.status(404).send("Today no appeals were received")
    }
    res.status(200).json({message: "Today's appeals: ", appeals})
}

const getYesterdaysAppeals = async (req, res) => {
    const startOfYesterday = new Date()
    startOfYesterday.setDate(startOfYesterday.getDate() - 1)
    startOfYesterday.setHours(0, 0, 0, 0)

    const endOfYesterday = new Date()
    endOfYesterday.setDate(endOfYesterday.getDate() - 1)
    endOfYesterday.setHours(23, 59, 59, 999)

    const appeals = await Appeal.find({
        createdAt: {$gte: startOfYesterday, $lte: endOfYesterday}
    })
    if(!appeals){
        res.status(404).send('Yesterday no appeals were received')
    }
}

const deleteAppeal = async(req, res) => {
    const {id} = req.params

  const deletingAppeal = await Appeal.findByIdAndDelete(id)
  if(!deletingAppeal){
    throw NotFoundError(`There is no appeal with id: ${id}`)
  }
    res.status(StatusCodes.OK).json({message: 'Appeal was deleted successfully'})
}

module.exports = {
    writeAppeal,
    getAllAppeals,
    deleteAppeal,
    getTodaysAppeals,
    getYesterdaysAppeals
}