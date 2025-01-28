'use client'
import React, { useEffect, useState } from 'react';
import { menuItemsCall } from '../services/MenuService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

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
        <div className="menu-nav px-6 mt-10 mb-1" >
            <nav role="navigation" className="mb-2 border-gray-200 items-center flex justify-center">
                <div className="items-center">
                    <div className="w-64 items-center flex justify-center">
                        <a href="/" rel="home" className="md:max-w-[200px] lg:max-w-[200px] m-4">
                            <img src="https://www.decameron.com/images/logos/logo-decameron-all-inclusive.png" alt="Inicio" />
                        </a>
                    </div>
                </div>
            </nav>
            <div className="mx-3 p-3 justify-center pl-4">
                <p className="rounded text-2xl mb-3 dark:text-zinc-400 text-zinc-700 dark:text-zinc-300"> ⓘ Sistema de Gestión de Hoteles</p>
                {
                    menuItems.map(item => (
                        <button className="shadow px-3 py-2 bg-custom-btn dark:text-zinc-300 text-white rounded hover:bg-custom-hover hover:opacity-75 ml-3" 
                            onClick={() => window.closeModal()}>
                            <FontAwesomeIcon icon="plus" /> {item.label}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;