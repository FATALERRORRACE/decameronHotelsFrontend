import React from 'react'; 

interface HotelCardProperties {
    name: string;
    addres: string;
    city: string;
    nit: number;
    roomAmount: number;   
}

const HotelCard: React.FC <HotelCardProperties> = ({name,addres,city,nit,roomAmount}) =>{
    return (
        <div>aquí donde usamos esas propiedades, interesante</div>
    );
};