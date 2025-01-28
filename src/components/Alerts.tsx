import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'gridjs/dist/theme/mermaid.css';

library.add(fas);

declare global {
    interface Window {
        showAlert: (message: string, type: string, show: boolean) => void;
    }
}

interface AlertProperties {
    message: string;
    type: string;
    show: boolean;
}

const Alerts = () => {

    var alertMessage: String;
    var alertType: String;

    const [alertVisible, setAlertVisible] = useState({
        message: '',
        type: 'info',
        show: false
    });

    window.showAlert = (message: string, type: string, show: boolean) => {
        alertType = type;
        setAlertVisible({
            message: message, type: type, show: true
        });
        setTimeout(() => {
            setAlertVisible({
                message: message,
                type: type,
                show: false
            });
        }, 3000);
    };

    return (
        <>
            {alertVisible.type === 'info' && (
                <div
                    id="alertForm"
                    className={`${alertVisible.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-sky-100 border-t-4 border-sky-500 rounded-b px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='circle-info' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alertVisible.message}</p>
                    </div>
                </div>
            )}
            {alertVisible.type === 'success' && (
                <div
                    id="alertForm"
                    className={`${alertVisible.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='check' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alertVisible.message}</p>
                    </div>
                </div>
            )}
            {alertVisible.type === 'error' && (
                <div
                    id="alertForm"
                    className={`${alertVisible.show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 absolute top-0 right-0 mt-4 mr-4 bg-red-500 border-t-4 border-red-700 rounded-b text-white px-4 py-3 shadow-md`}
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <FontAwesomeIcon icon='circle-xmark' size="xl" />
                        </div>
                        <p className="p-2 text-bold">{alertVisible.message}</p>
                    </div>
                </div>
            )}
        </>
    )
}
export default Alerts;