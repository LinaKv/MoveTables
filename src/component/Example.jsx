import { Container } from './Container';

import React from 'react';

function Example() {
    const highlight = (text) => <span className="color">{text}</span>;
    return (
        <div className="containerWrapper">
            <div className="appNaming">
                {highlight('Add')} a new table, {highlight('move')} it and {highlight('save')}
            </div>

            <Container />
        </div>
    );
}

export default Example;
