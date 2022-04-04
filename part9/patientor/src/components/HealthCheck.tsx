import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
const HealthCheck = ({entry}: {entry: HealthCheckEntry}) => {
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

export default HealthCheck;