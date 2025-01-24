import React, { useEffect, useState } from 'react';

interface HotelCardProperties {
    name: string;
    addres: string;
    city: string;
    nit: number;
    roomAmount: number;
}

export const showHotelProperties = () => {
    console.log("here");
}
export const useHotelDataGrid = () => {
    const [data, setData] = useState<HotelCardProperties[]>([]);
    return { data, setData };
}