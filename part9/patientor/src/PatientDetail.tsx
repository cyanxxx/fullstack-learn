import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "./types";
import { Icon } from 'semantic-ui-react';
import { addPatient, useStateValue } from "./state";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import EntryDetails from "./components/EntryDetails";
const PatientDetail = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient = patients[id];
    useEffect(() => {
        const fetchPatient = async () => {
            if(!patient) {
                const { data: patientDetail } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                    dispatch(addPatient(patientDetail));
                }
        };
        void fetchPatient();
    }, [id, patient]);
   
    const getIcon = (gender: Gender) => {
        switch (gender) {
            case Gender.Female: {
                return 'woman';
            }
            case Gender.Male: {
                return 'man';
            }
            case Gender.Other: {
                return 'other gender';
            }
        }
    };
    if(!patient) {
        return <div>loading...</div>;
    }
    return (
        <div>
            <h3>
                {patient.name}
                <Icon name={getIcon(patient.gender)}></Icon>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <div>entries: {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry}></EntryDetails>)}</div>
            </h3>
        </div>
       
    );
};

export default PatientDetail;