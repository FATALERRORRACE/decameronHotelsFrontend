'use client';

import React, { useEffect, useState } from 'react';
import { getRoomTypes, getRoomSizes } from '../services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const RoomTypes: React.FC = (props) => {

    var sumRooms = 0;
    
    const [itemsRoomTypes, setItemsTypes] = useState<
        Array<{ id: string; label: string; isActive: boolean }>
    >([]);
    const [itemsRoomSizes, setItemsSizes] = useState<
        Array<{ id: string; label: string; allowed_room_type: string }>
    >([]);

    const [dataRooms, setDataRooms] = useState<{ [key: string]: { [key: string]: number } }>(() => {
        const storedData = localStorage.getItem('dataRooms');
        return storedData ? JSON.parse(storedData) : {};
    });

    useEffect(() => {
        const fetchData = async () => {
            const roomTypes = await getRoomTypes();
            const initializedRoomTypes = roomTypes.map((type) => ({
                ...type,
                isActive: !!dataRooms[type.id],
            }));
            setItemsTypes(initializedRoomTypes);

            const roomSizes = await getRoomSizes();
            setItemsSizes(roomSizes);
        };

        fetchData();
    }, [dataRooms]);

    const updateRoomType = (itemTypes: { id: string; label: string; isActive: boolean }) => {
        const updatedRoomTypes = itemsRoomTypes.map((type) =>
            type.id === itemTypes.id ? { ...type, isActive: !type.isActive } : type
        );
        setItemsTypes(updatedRoomTypes);

        const updatedDataRooms = { ...dataRooms };
        if (!itemTypes.isActive) {
            updatedDataRooms[itemTypes.id] = {};
        } else {
            delete updatedDataRooms[itemTypes.id];
        }
        setDataRooms(updatedDataRooms);
        localStorage.setItem('dataRooms', JSON.stringify(updatedDataRooms));
    };

    const handleInputChange = (typeId: string, sizeId: string, value: string) => {
        var numericValue = value === '' ? 0 : parseInt(value, 10) || 0;
        const updatedDataRooms = {
            ...dataRooms,
            [typeId]: {
                ...dataRooms[typeId], [sizeId]: numericValue == 0 ? '' : numericValue  ,
            },
        };

        let sumRooms = 0;
        Object.values(updatedDataRooms).forEach(element => {
            Object.values(element).forEach(subelement => {
                if(subelement != '')
                    sumRooms+= subelement;
            });
        });

        if(sumRooms > props.roomAmount){
            window.showAlert('La cantidad de habitaciones no puede superar ' + props.roomAmount, 'error');
            updatedDataRooms[typeId][sizeId] = '';
        }

        setDataRooms(updatedDataRooms);
        localStorage.setItem('dataRooms', JSON.stringify(updatedDataRooms));
    };

    return (
        <div className="p-1 flex justify-center">
            {itemsRoomTypes.map((itemTypes) => (
                <div className="border rounded m-2" key={itemTypes.id}>
                    
                    <button
                        className={
                            `px-4 py-2 rounded hover:bg-blue-700 hover:text-white hover:opacity-75 w-full 
                            ${itemTypes.isActive ? 'bg-green-800 text-white' : 'bg-zinc-300'}`
                        }
                        onClick={() => updateRoomType(itemTypes)}
                    >
                        {itemTypes.label}{' '}
                        <FontAwesomeIcon icon={itemTypes.isActive ? 'check' : 'circle-xmark'} />
                    </button>
                    <h3 className="text-gray-500 mt-2 text-center">Acomodación:</h3>
                    {itemsRoomSizes.map((itemSizes) => (
                        <div
                            className={
                                `pr-4 py-2 flex justify-between 
                                ${itemTypes.isActive ? 'text-zinc-800' : 'text-zinc-300'}
                                ${itemSizes.allowed_room_type == '' ? '' : itemSizes.allowed_room_type.split(",").find((val) => val == itemTypes.id) ? '' : 'hidden'}`
                            }
                            key={itemSizes.id}
                        >
                            <div>
                                <input
                                    checked={
                                        dataRooms[itemTypes.id]?.[itemSizes.id] !== undefined &&
                                        dataRooms[itemTypes.id][itemSizes.id] > 0
                                    }
                                    disabled={!itemTypes.isActive}
                                    type="checkbox"
                                    className="m-2"
                                    onChange={() => handleInputChange(itemTypes.id, itemSizes.id, '0')}
                                />
                                {itemSizes.label}
                            </div>
                            <input
                                className="border border-blue-300 rounded ml-2 px-2 w-20"
                                type="number"
                                value={
                                    dataRooms[itemTypes.id]?.[itemSizes.id] !== undefined
                                        ? dataRooms[itemTypes.id][itemSizes.id]
                                        : ''
                                }
                                onChange={(e) =>
                                    handleInputChange(itemTypes.id, itemSizes.id, e.target.value)
                                }
                                placeholder="Cant."
                                disabled={!itemTypes.isActive}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RoomTypes;
