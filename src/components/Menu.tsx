'use client'
import React, { useEffect, useState } from 'react';
import { menuItemsCall, openMenuSelected } from '../services/MenuService';
interface MenuItem {
    id: number;
    label: string;
}

const Menu: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const getMenuItems = async () => {
            const items = await menuItemsCall();
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
                        onClick={() => openMenuSelected(item.id)}
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