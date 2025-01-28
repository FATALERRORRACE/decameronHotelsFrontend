import React, { useState } from 'react';
import axios from 'axios';
import nextConfig from '../../next.config';
import RoomTypes from './RoomTypes';
import { useAlert } from './alerts/AlertContext';

declare global {
    interface Window {
        closeModal: () => void;
    }
}

const FormNewHotel: React.FC = () => {
    const [step, setStep] = useState(1);
    const { showAlert } = useAlert(); 
    const [hotelData, setHotelData] = useState({
        name: '',
        address: '',
        city: '',
        nit: '',
        roomAmount: 0,
        dataRooms: []
    });

    const nextStep = () => {
        switch (step) {
            case 1:
                const formData = new FormData(document.querySelector('#form-new-hotel') as HTMLFormElement);
                const formValidation = [
                    {
                        field: 'name',
                        label: 'Nombre',
                    },
                    {
                        field: 'address',
                        label: 'Dirección',
                    },
                    {
                        field: 'city',
                        label: 'Ciudad',
                    },
                    {
                        field: 'nit',
                        label: 'NIT',
                    },
                    {
                        field: 'roomAmount',
                        label: 'Cantidad de habitaciones',
                    }
                ];
                formValidation.forEach(element => {
                    if (formData.get(element.field) == '') {
                        showAlert(`Ingrese el valor del campo '${element.label}' `, 'info');
                        throw `Ingrese el valor del campo '${element.label}'`;
                    }
                });

                break;
            case 3:
                axios.post(`${nextConfig.apiUrl}/hotels/new`, {
                    name: hotelData.name,
                    address: hotelData.address,
                    city: hotelData.city,
                    nit: hotelData.nit,
                    roomamount: hotelData.roomAmount,
                    dataRooms: localStorage.getItem('dataRooms') ? JSON.parse(localStorage.getItem('dataRooms')!) : []
                })
                    .then(() => {
                        window.useHotelDataGrid();
                        localStorage.removeItem('newHotelData');
                        localStorage.removeItem('dataRooms');
                        showAlert('Nuevo Hotel Registrado', 'success');
                        closeModal();
                    })
                    .catch(error => {
                        console.error('There was an error creating the hotel!', error);
                    });
                break;
            default:
                break;
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        if (localStorage.getItem('dataRooms'))
            localStorage.removeItem('dataRooms');
        if (localStorage.getItem('newHotelData'))
            localStorage.removeItem('newHotelData');
        setStep(1);
        setIsModalOpen(isModalOpen ? false : true);
    };
    if (typeof window !== "undefined")
        window.closeModal = closeModal;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" style={{ display: isModalOpen ? 'flex' : 'none' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg size-fit">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-700">
                        Registrar Nuevo Hotel
                    </span>
                    <button type="button" className="px-2 bg-gray-300 text-white rounded-lg" onClick={closeModal}>x</button>
                </div>

                {step === 1 && (
                    <div>
                        <h3 className="text-xl text-gray-700 mb-4 ">Paso 1: Información Básica</h3>
                        <form id="form-new-hotel">
                            <div className="flex">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Nombre</label>
                                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" value={hotelData.name} onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Dirección</label>
                                    <input type="text" id="address" name="address" className="w-full px-3 py-2 border rounded-lg" value={hotelData.address} onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Ciudad</label>
                                    <input type="text" id="city" name="city" className="w-full px-3 py-2 border rounded-lg" value={hotelData.city} onChange={(e) => setHotelData({ ...hotelData, city: e.target.value })} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">NIT</label>
                                    <input type="text" id="nit" name="nit" className="w-full px-3 py-2 border rounded-lg" value={hotelData.nit} onChange={(e) => setHotelData({ ...hotelData, nit: e.target.value })} />
                                </div>
                            </div>
                            <div className="mx-2 mb-4 w-1/3">
                                <label className="block text-gray-700">Cantidad de Habitaciones</label>
                                <input type="number" id="roomAmount" name="roomAmount" className="w-20 px-3 py-2 border rounded-lg" value={hotelData.roomAmount} onChange={(e) => setHotelData({ ...hotelData, roomAmount: parseInt(e.target.value) })} />
                            </div>
                        </form>
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={closeModal} >
                                Cerrar
                            </button>
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextStep}>
                                Siguiente
                            </button>
                        </div>

                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h3 className="text-xl mb-2 text-gray-700">Paso 2: Habitaciones</h3>
                        <span className=" text-gray-500">Tipo de Habitación</span>
                        <RoomTypes roomAmount={hotelData.roomAmount} />
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={prevStep}>
                                Anterior
                            </button>
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextStep}>
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl mb-4">Paso 3: Revisar Información</h3>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{hotelData.name}</h4>
                            <p><strong className='text-gray-500'>Dirección:</strong> {hotelData.address}</p>
                            <p><strong className='text-gray-500'>Ciudad:</strong> {hotelData.city}</p>
                            <p><strong className='text-gray-500'>NIT:</strong> {hotelData.nit}</p>
                            <p><strong className='text-gray-500'>Cant. Habitaciones:</strong> {hotelData.roomAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={prevStep}>
                                Anterior
                            </button>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={nextStep}>
                                Guardar Datos
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormNewHotel;