import patientsData from '../../data/patients';
import { Entry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid'

const getEntries = () => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient= (entry: NewPatientEntry) => {
    const newPatient = {
        id: uuid(),
        ...entry
      };
    
      patientsData.push(newPatient);
      return newPatient;
};

const getOne = (id: string) => {
    return patientsData.find(patient => patient.id === id);
};

const addEntry = (id: string, newEntry: Entry) => {
  let editPatient = patientsData.find(patient => patient.id === id)
  if(editPatient) {
    editPatient = {...editPatient, entries: [...editPatient.entries, newEntry]}
  }
  patientsData.map(patient => patient.id === id? editPatient : patient);
  return editPatient
};

export default {
  getEntries,
  addPatient,
  getOne,
  addEntry
};