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

interface HotelCardProperties {
    name: string;
    addres: string;
    city: string;
    nit: number;
    roomAmount: number;
}

const GridRender = () => {

    const [alertVisible, setAlertVisible] = useState(false);
    window.showAlert = () => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    };
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
            id: 'id',
            width: '100px',
            formatter: (_, row) =>
                html(
                    `<button onClick="openModalEdit(${row.cells[0].data})" class="bg-blue-300 hover:bg-blue-700 text-white py-1 px-2 rounded">
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
        <>
            <div 
                id="alertForm" 
                className={`${alertVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md`} 
                role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                    <p className="font-bold">Cambios Guardados</p>
                    <p className="text-sm">Nuevo Hotel Registrado</p>
                    </div>
                </div>
            </div>
            <Grid
                data={data}
                columns={columns}
                search={false}
                pagination={{
                    limit: 10,
                }}
            />
        </>
    )
}
export default GridRender;