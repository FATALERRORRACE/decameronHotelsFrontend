import React, { createContext, useContext, useState } from 'react';
import Alerts  from './Alerts';
interface AlertContextType {
    showAlert: (message: string, type: 'info' | 'error' | 'success') => void;
    alert: { message: string; type: string; show: boolean };
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState({
        message: '',
        type: 'info',
        show: false,
    });

    const showAlert = (message: string, type: 'info' | 'error' | 'success') => {
        console.log('showAlert');
        setAlert({ message, type, show: true });
        setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert, alert }}>
            {children}
            <Alerts />
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};