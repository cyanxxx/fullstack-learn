import express from 'express';
import patientsService from '../services/patientsService'
const route = express.Router()

route.get('/', (_req, res) => {
    return res.json(patientsService.getEntries())
})
route.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation, entries  } = req.body;
    const newDiaryEntry = patientsService.addPatient({ name, dateOfBirth, ssn, gender, occupation, entries });
    res.json(newDiaryEntry);
})
route.post('/:id/entries', (req, res) => {
    const { entry } = req.body;
    const id = req.params.id
    const newDiaryEntry = patientsService.addEntry(id, entry);
    res.json(newDiaryEntry);
})
route.get('/:id', (req, res) => {
    const id = req.params.id
    return res.json(patientsService.getOne(id))
})

export default route