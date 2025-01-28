import React from 'react';
import Menu from './Menu';
import GridRender from './GridRender';
import FormNewHotel from './FormNewHotel';
import FormEditHotel from './FormEditHotel';
import Alerts from './Alerts';


const App: React.FC = () => {
    return (
        <>
            <div className='sm:mx-2 md:mx-5 lg:mx-10 xl:mx-40 mt-2 shadow border rounded border-zinc-600/10 mx-3 bg-zinc-300/60 dark:bg-zinc-300/20 p-3 justify-center dark:backdrop-blur-xl backdrop-blur-sm pl-4' >
                <Menu />
                <GridRender />
            </div>
            <FormNewHotel />
            <FormEditHotel />
            <Alerts />
        </>
    );
}

export default App