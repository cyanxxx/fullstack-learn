import React from 'react';
import { Entry } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcareEntry from './OccupationalHealthcare';

const EntryDetails = (props: {entry: Entry}) => {
    const entry = props.entry;
    switch(entry.type) {
        case 'HealthCheck': {
            return (
                <HealthCheck entry={entry}></HealthCheck>
            );
        }
        case 'Hospital': {
            return (
                <Hospital entry={entry}></Hospital>
            );
        }
        case 'OccupationalHealthcare': {
            return (
                <OccupationalHealthcareEntry entry={entry}></OccupationalHealthcareEntry>
            );
        }
        default: {
            return null;
        }
    }
};

export default EntryDetails;