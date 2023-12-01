import React from 'react';

function Control({ type, img, addTable }) {
    const onClick = () => addTable(type);
    return (
        <div className="tableSettings">
            <div className="titleWrapper" onClick={onClick}>
                <img src={img} alt="" className="example" />
                <p className="title">Table for {type} person</p>
            </div>
        </div>
    );
}

export default Control;
