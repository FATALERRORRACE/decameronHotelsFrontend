'use client'
import React, { useEffect, useState } from 'react';
import { getRoomTypes, getRoomSizes } from '../services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const RoomTypes: React.FC = () => {

    const [itemsRoomTypes, setItemsTypes] = useState<Array<{ id: string, label: string, isActive: boolean }>>([]);
    const [itemsRoomSizes, setItemsSizes] = useState<Array<{ id: string, label: string, isActive: boolean }>>([]);
    const [activeLabels, setActiveLabels] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        const getitems = async () => {
            var callItemsTypes = await getRoomTypes();
            callItemsTypes = callItemsTypes.map( type =>
                localStorage.getItem('dataRooms') ?
                    JSON.parse(localStorage.getItem('dataRooms'))[type.id] ? { ...type, isActive: !type.isActive } : type
                : type
            );
            setItemsTypes(callItemsTypes);
            const callItemsSizes = await getRoomSizes();
            setItemsSizes(callItemsSizes);
        };
        getitems();
    }, []);

    const updateRoomType = (itemTypes: { id: string, label: string, isActive: boolean }) => {
        const updatedItems = itemsRoomTypes.map(type =>
            type.id === itemTypes.id ? { ...type, isActive: !type.isActive } : type
        );
        setItemsTypes(updatedItems);

        const newActiveLabels = localStorage.getItem('dataRooms') ? JSON.parse(localStorage.getItem('dataRooms')) : { ...activeLabels };
        if (!itemTypes.isActive) {
            newActiveLabels[itemTypes.id] = [];
        } else {
            delete newActiveLabels[itemTypes.id];
        }
        setActiveLabels(newActiveLabels);
        localStorage.setItem(
            'dataRooms', 
            JSON.stringify(newActiveLabels)
        );
    }

    const updateRoomSize = (itemTypesId: string, itemSizesId: string) => {
        const newActiveLabels = localStorage.getItem('dataRooms') ? JSON.parse(localStorage.getItem('dataRooms')) : { ...activeLabels };
        if (!newActiveLabels[itemTypesId]) {
            newActiveLabels[itemTypesId] = [];
        }
        const index = newActiveLabels[itemTypesId].indexOf(itemSizesId);
        if (index > -1) {
            newActiveLabels[itemTypesId].splice(index, 1);
        } else {
            newActiveLabels[itemTypesId].push(itemSizesId);
        }
        setActiveLabels(newActiveLabels);
        console.log(newActiveLabels);
        localStorage.setItem(
            'dataRooms', 
            JSON.stringify(newActiveLabels)
        );
    }

    return (
        <div className="p-1 flex justify-center">
            {
                itemsRoomTypes.map(itemTypes => (
                    <div className='border rounded m-2' key={itemTypes.id}>
                        <button
                            className={`px-4 py-2 rounded hover:bg-blue-700 hover:text-white hover:opacity-75 w-full ${itemTypes.isActive ? 'bg-green-800 text-white' : 'bg-zinc-300'}`}
                            onClick={() => updateRoomType(itemTypes)} >
                            {itemTypes.label} <FontAwesomeIcon icon={itemTypes.isActive ? 'check' : 'circle-xmark'} />
                        </button>
                        <h3 className="text-gray-500 mt-2 text-center">Acomodación</h3>
                        {
                            itemsRoomSizes.map(itemSizes => (
                                <div className={`pr-4 py-2 ${itemTypes.isActive ? 'text-zinc-800' : 'text-zinc-300'}`} key={itemSizes.id}>
                                    <input
                                        checked={
                                            localStorage.getItem('dataRooms') ? 
                                            (
                                                JSON.parse(localStorage.getItem('dataRooms'))[itemTypes.id] ? 
                                                (
                                                    JSON.parse(localStorage.getItem('dataRooms'))[itemTypes.id].find((element) => element == itemSizes.id) ? 
                                                    true : 
                                                    false
                                                ) :
                                                false
                                            ): 
                                            false 
                                        }
                                        disabled={!itemTypes.isActive}
                                        type="checkbox"
                                        className="m-2"
                                        value={itemSizes.id}
                                        onChange={() => updateRoomSize(itemTypes.id, itemSizes.id)} />
                                    {itemSizes.label} <FontAwesomeIcon icon="bed" />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default RoomTypes;