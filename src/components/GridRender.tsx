import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import { html } from "gridjs";
import { listItemsCall } from '../services/ListService';
import 'gridjs/dist/theme/mermaid.css';

declare global {
    interface Window {
        useHotelDataGrid: () => void;
        HotelDataGrid: (data: HotelCardProperties[]) => void;
    }
}

interface HotelCardProperties {
    id: number;
    name: string;
    address: string;
    city: string;
    nit: number;
    room_amount: number;
}

const GridRender = () => {

    const [data, setData] = useState<HotelCardProperties[]>([])

    useEffect(() => {
        const getDataGrid = async () => {
            const dataGrid = await listItemsCall();
            setData(dataGrid.data);
        };
        window.useHotelDataGrid = getDataGrid;
        getDataGrid();
    }, []);

    const columns = [
        {
            id: 'id',
            width: '100px',
            formatter: (_: any, row: any) =>
                html(
                    `<button onClick="openModalEdit(${row.cells[0].data})" class="bg-blue-900 hover:bg-blue-700 text-white py-1 px-2 rounded">
                        Editar
                    </button>`
                )
        },
        {
            id: 'name',
            name: html('NOMBRE <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
            formatter: (_: any, row: any) =>
                html(
                    `<a onClick="openModalEdit(${row.cells[0].data})" class="text-blue-900 hover:underline">
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
            name: html('DIRECCIÓN <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
        },
        {
            id: 'city',
            name: html('CIUDAD <br><input type="text" class="gridjs-input border border-gray-300 rounded p-2">'),
        },
        {
            id: 'room_amount',
            name: 'NO. HABITACIONES',
        },
    ];

    return (
        <>
            <Grid
                data={data.map(item => [item.id, item.name, item.nit, item.address, item.city, item.room_amount])}
                columns={columns}
                search={false}
                pagination={{
                    limit: 7,
                }}
            />
        </>
    )
}
export default GridRender;