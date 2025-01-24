declare global {
    interface Window {
        useHotelDataGrid: (data: HotelCardProperties[]) => void;
        HotelDataGrid: (data: HotelCardProperties[]) => void;
    }
}

import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import { html } from "gridjs";
import { listItemsCall } from '../services/ListService';
import 'gridjs/dist/theme/mermaid.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

interface HotelCardProperties {
    name: string;
    addres: string;
    city: string;
    nit: number;
    roomAmount: number;
}

const GridRender = () => {
    const [data, setData] = useState<HotelCardProperties[]>([])
    window.useHotelDataGrid = setData;
    useEffect(() => {
        const getData = async () => {
            const dataGrid = await listItemsCall();
            window.useHotelDataGrid(dataGrid.data);
            window.HotelDataGrid = dataGrid.data;
        };
        getData();
    }, []);

    const columns = [
        {
            width: '100px',
            formatter: (_, row) =>
                html(
                    `<button onClick="showHotelProperties()" class="bg-blue-300 hover:bg-blue-700 text-white py-1 px-2 rounded">
                        Editar
                    </button>`
                )
        },
        {
            id: 'name',
            name: html('Nombre <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
            formatter: (_, row) =>
                html(
                    `<a onClick="showHotelProperties()" class="text-blue-900 hover:underline">
                        ${row.cells[1].data}
                    </a>`
                )
        },
        {
            id: 'nit',
            name: html('NIT<br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
        },
        {
            id: 'address',
            name: html('Dirección <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
        },
        {
            id: 'city',
            name: html('Ciudad <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
        },
        {
            id: 'roomAmount',
            name: 'No. Habitaciones',
        },
    ];

    return (
        <Grid
            data={data}
            columns={columns}
            search={false}
            pagination={{
                limit: 10,
            }}
        />
    )
}
export default GridRender;