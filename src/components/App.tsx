import React from 'react';
import Menu from './Menu';
import GridRender from './GridRender';
import { showHotelProperties, useHotelDataGrid } from './utils';
import FormNewHotel from './FormNewHotel';

if (typeof window !== 'undefined') {
    (window as any).showHotelProperties = showHotelProperties;
    (window as any).useHotelDataGrid = useHotelDataGrid;
    //(window as any).useHotelDataGrid = useHotelDataGrid;
}

const App: React.FC = () => {
    return (
        <>
            <div className='sm:mx-2 md:mx-5 lg:mx-10 xl:mx-40 mt-2' >
                <Menu />
                <GridRender />
            </div>
            <FormNewHotel />
        </>
    );
}

export default App