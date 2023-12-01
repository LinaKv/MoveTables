import React from 'react';
import Control from './Control';
import { saveAs } from 'file-saver';
import { createCSV } from '../../utils/createCSV';

function Settings({ addTable, dataInfo }) {
    const variants = [6, 4, 2];

    const handleDownload = () => {
        const file = new Blob([createCSV(dataInfo)], { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'furniture.csv');
    };

    return (
        <div className="settings">
            <div className="tableSettingsWrapper">
                {variants.map((type) => (
                    <Control type={type} img={`src/assets/tableFor${type}.svg`} addTable={addTable} key={type} />
                ))}
            </div>
            <button onClick={handleDownload} className="buttonDownload">
                Download
            </button>
        </div>
    );
}

export default Settings;
