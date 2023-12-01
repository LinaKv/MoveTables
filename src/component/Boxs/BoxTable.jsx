import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes.js';
import { useState } from 'react';

export const BoxTable = ({ id, left, top, children, deleteTable }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { id, left, top },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top],
    );
    if (isDragging) {
        return <div ref={drag} />;
    }

    const changeVisible = () => setIsVisible(!isVisible);

    const onClick = () => deleteTable(id);

    return (
        <div
            className={isVisible ? 'boxWithDelete' : 'box'}
            ref={drag}
            style={{ left, top }}
            data-testid="box"
            onClick={changeVisible}
        >
            {children}
            <div className={isVisible ? '' : 'hideElement'}>
                <button className="buttonDelete" onClick={onClick}>
                    delete
                </button>
            </div>
        </div>
    );
};
