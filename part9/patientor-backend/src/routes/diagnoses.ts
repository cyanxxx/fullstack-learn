import express from 'express';
import diagnosesService from '../services/diagnosesService'
const route = express.Router()

route.get('/', (_req, res) => {
    return res.json(diagnosesService.getEntries())
})

export default route