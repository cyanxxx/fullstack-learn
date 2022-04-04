import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
const Hospital = ({entry}: {entry: HospitalEntry}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="hospital"></Icon>
                </Card.Header>
                    {entry.description}
            </Card.Content>
        </Card>
    );
};

export default Hospital;