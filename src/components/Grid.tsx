import React, { useEffect, useState} from 'react';
import {
    DataSheetGrid,
    checkboxColumn,
    textColumn,
    keyColumn,
} from 'react-datasheet-grid'
// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'
import { openMenuSelected } from '../services/MenuService';

interface HotelCardProperties {
    name: string;
    addres: string;
    city: string;
    nit: number;
    roomAmount: number;   
}

export const gridRender = () => {
    const [ data, setData ] = useState<HotelCardProperties[]>([])
  
    useEffect(() => {
        const getData = async() => {
            const dataGrid = await openMenuSelected();
            setData(dataGrid);
        };
        getData();
    }, []);

    const columns = [
        { ...keyColumn('active', checkboxColumn), title: 'Active' },
        { ...keyColumn('firstName', name), title: 'Nombre' },
        { ...keyColumn('lastName', addres), title: 'NIT' },
        { ...keyColumn('lastName', city), title: 'Dirección' },
        { ...keyColumn('lastName', nit), title: 'Ciudad' },
        { ...keyColumn('lastName', roomAmount), title: 'No. Habitaciones' },
    ]
  
    return (
        <DataSheetGrid
            value={data}
            onChange={setData}
            columns={columns}
        />
    )
}