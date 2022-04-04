import { State } from "./state";
import { Patient } from "../types";
type SetPatientList = {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
};
type AddPatient = {
  type: "ADD_PATIENT";
  payload: Patient;
};
export type Action =
  | SetPatientList
  | AddPatient;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};


export const setPatientList = (patientListFromApi: Patient[]): SetPatientList => {
  return (
    { type: "SET_PATIENT_LIST", payload: patientListFromApi }
  );
};
export const addPatient = (newPatient: Patient): AddPatient => {
  return (
    { type: "ADD_PATIENT", payload: newPatient }
  );
};