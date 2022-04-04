import { NewPatientEntry, Gender } from './types';
type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing parm');
      }
    
      return name;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewDiaryEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {

    const newEntry: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };
  
    return newEntry;
  };

  
export default toNewDiaryEntry;