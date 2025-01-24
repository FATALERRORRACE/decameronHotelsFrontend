'use client'
import React, { useEffect, useState } from 'react';
import { getRoomSizes } from '../services/RoomService';
interface MenuItem {
    id: number;
    label: string;
}

const RoomSizes: React.FC = () => {
    const [itemsRoom, setitems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const getitems = async () => {
            const callItems = await getRoomSizes();
            setitems(callItems);
        };
        getitems();
    }, []);

    return (
        <div>
            <div className="p-1 flex justify-center">
                {
                    itemsRoom.map(item => (
                            <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-700 hover:opacity-75" >
                                {item.label}
                            </button>
                    ))
                }
            </div>
        </div>
    );
};

export default RoomSizes;