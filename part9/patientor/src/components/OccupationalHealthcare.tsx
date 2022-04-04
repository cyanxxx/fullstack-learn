import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';
const OccupationalHealthcare = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="doctor"></Icon>
                </Card.Header>
                    {entry.description}
            </Card.Content>
        </Card>
    );
};

export default OccupationalHealthcare;