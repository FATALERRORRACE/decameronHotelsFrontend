import React, { useState } from 'react';
import axios from 'axios';
import nextConfig from '../../next.config';
import RoomTypes from './RoomTypes';

declare global {
    interface Window {
        closeModal: () => void;
    }
}

const FormNewHotel: React.FC = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        switch (step) {
            case 1:
                const formData = new FormData(document.querySelector('#form-new-hotel') as HTMLFormElement);
                localStorage.setItem('newHotelData',
                    JSON.stringify([
                        {
                            name: formData.get('name'),
                            address: formData.get('address'),
                            city: formData.get('city'),
                            nit: formData.get('nit'),
                            roomAmount: formData.get('roomAmount')
                        }
                    ])
                );
                break;
            case 2:

                break;
            case 3:

                break;
            case 10:
                axios.post(`${nextConfig.apiUrl}/hotels/new`, {
                    name: JSON.parse(localStorage.getItem('newHotelData')!)[0].name,
                    address: JSON.parse(localStorage.getItem('newHotelData')!)[0].address,
                    city: JSON.parse(localStorage.getItem('newHotelData')!)[0].city,
                    nit: JSON.parse(localStorage.getItem('newHotelData')!)[0].nit,
                    roomAmount: JSON.parse(localStorage.getItem('newHotelData')!)[0].roomAmount
                })
                    .then(response => {
                        window.useHotelDataGrid(
                            window.HotelDataGrid.concat(
                                [
                                    {
                                        name: JSON.parse(localStorage.getItem('newHotelData')!)[0].name,
                                        address: JSON.parse(localStorage.getItem('newHotelData')!)[0].address,
                                        city: JSON.parse(localStorage.getItem('newHotelData')!)[0].city,
                                        nit: JSON.parse(localStorage.getItem('newHotelData')!)[0].nit,
                                        roomAmount: JSON.parse(localStorage.getItem('newHotelData')!)[0].roomAmount
                                    }
                                ]
                            )
                        );
                        console.log('Hotel created successfully:', response.data);

                    })
                    .catch(error => {
                        console.error('There was an error creating the hotel!', error);
                    });
                break;
            default:
                break;
        }
        if (step == 3) {

            setStep(step + 1);
            return;

        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(isModalOpen ? false : true);
    };

    window.closeModal = closeModal;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" style={{ display: isModalOpen ? 'flex' : 'none' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg size-fit">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Registrar Nuevo Hotel</h2>
                {step === 1 && (
                    <div>
                        <h3 className="text-xl text-gray-700 mb-4 ">Paso 1: Información Básica</h3>
                        <form id="form-new-hotel">
                            <div className="flex ">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Nombre</label>
                                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].name : ''} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Dirección</label>
                                    <input type="text" id="address" name="address" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].address : ''} />
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Ciudad</label>
                                    <input type="text" id="city" name="city" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].city : ''} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">NIT</label>
                                    <input type="text" id="nit" name="nit" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].nit : ''} />
                                </div>
                            </div>
                            <div className="mx-2 mb-4 w-1/3">
                                <label className="block text-gray-700">Cantidad de Habitaciones</label>
                                <input type="number" id="roomAmount" name="roomAmount" className="w-20 px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].roomAmount : ''} />
                            </div>
                        </form>
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" disabled>
                                Previous
                            </button>
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextStep}>
                                Next
                            </button>
                        </div>

                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h3 className="text-xl mb-2 text-gray-700">Paso 2: Habitaciones</h3>
                        <span className=" text-gray-500">Tipo de Habitación</span>
                        <RoomTypes />
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={prevStep}>
                                Previous
                            </button>
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl mb-4">Paso 3: Revisar Información</h3>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].name : ''}</h4>
                            <p><strong className='text-gray-500'>Dirección:</strong> {localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].address : ''}</p>
                            <p><strong className='text-gray-500'>Ciudad:</strong> {localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].city : ''}</p>
                            <p><strong className='text-gray-500'>NIT:</strong> {localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].nit : ''}</p>
                            <p><strong className='text-gray-500'>Cant. Habitaciones:</strong> {localStorage.getItem('newHotelData') ? JSON.parse(localStorage.getItem('newHotelData')!)[0].roomAmount : ''}</p>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={prevStep}>
                                Previous
                            </button>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={nextStep}>
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormNewHotel;



