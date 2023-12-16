import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BoxTable } from './Boxs/BoxTable';
import { ItemTypes } from '../ItemTypes.js';
import Settings from './Settings/Settings';
import { v4 as uuidv4 } from 'uuid';

export const Container = () => {
    const [furniture, setFurniture] = useState({});

    const moveTable = useCallback(
        (id, left, top) => {
            setFurniture(
                update(furniture, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            );
        },
        [furniture, setFurniture],
    );

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                moveTable(item.id, left, top);
                return undefined;
            },
        }),
        [moveTable],
    );

    function renderElement(param) {
        switch (param) {
            case 'Table6':
                return <img src="./assets/tableFor6.svg" alt="" className="table" />;
            case 'Table4':
                return <img src="./assets/tableFor4.svg" alt="" className="table" />;
            case 'Table2':
                return <img src="./assets/tableFor2.svg" alt="" className="table" />;
            default:
                return null;
        }
    }

    function addTable(places) {
        const newId = uuidv4();

        setFurniture((prev) => ({
            ...prev,
            [newId]: { top: 20, left: 20, name: `Table${places}` },
        }));
    }

    function deleteTable(id) {
        setFurniture((prev) => {
            const { [id]: removeItem, ...newFurniture } = prev;
            return newFurniture;
        });
    }

    return (
        <div className="container">
            <div className="settingsWrapper">
                <Settings addTable={addTable} dataInfo={furniture} />
            </div>
            <div className="board" ref={drop}>
                {Object.entries(furniture).map(([key, value]) => {
                    const { left, top, name } = value;
                    return (
                        <BoxTable key={key} id={key} left={left} top={top} deleteTable={deleteTable}>
                            {renderElement(name)}
                        </BoxTable>
                    );
                })}
                <div className="clueText">Click on table to delete</div>
            </div>
        </div>
    );
};
