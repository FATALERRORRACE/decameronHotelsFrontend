import React from 'react';
import { useAlert } from './AlertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'gridjs/dist/theme/mermaid.css';

library.add(fas);
const Alerts: React.FC = () => {
    const { alert } = useAlert();

    return (
        <>
            {alert.type === 'info' && (
                <div
                    id="alertForm"
                    className={`${alert.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-sky-100 border-t-4 border-sky-500 rounded-b px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='circle-info' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alert.message}</p>
                    </div>
                </div>
            )}
            {alert.type === 'success' && (
                <div
                    id="alertForm"
                    className={`${alert.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='check' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alert.message}</p>
                    </div>
                </div>
            )}
            {alert.type === 'error' && (
                <div
                    id="alertForm"
                    className={`${alert.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-red-500 border-t-4 border-red-700 rounded-b text-white px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='circle-xmark' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alert.message}</p>
                    </div>
                </div>
            )}
        </>
    )

    return (
        <div
            className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-info'} fixed top-4 right-4`}
            role="alert">
            HOLAHOLA HOLA HOLA HOLAHOLA
            <p>{alert.message}</p>
        </div>
    );
};

export default Alerts;
