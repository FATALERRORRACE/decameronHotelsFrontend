'use client'
import React, { useEffect, useState } from 'react';
import { listItemsCall } from '../services/ListService';

const Menu: React.FC = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const getMenuItems = async () => {
            const items = await listItemsCall();
            setMenuItems(items.data);
        };
        getMenuItems();
    }, []);
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
            {
                menuItems.map(item => (
                <li key={item.id}>
                    <button 
                        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-700 hover:opacity-75"
                    >
                    {item.label}
                    </button>
                </li>
                ))
            }
            </ul>
        </nav>
    );
};

export default Menu;