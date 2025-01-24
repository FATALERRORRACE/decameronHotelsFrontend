import React, { useState } from 'react';
import axios from 'axios';
import nextConfig from '../../next.config';
import RoomTypes from './RoomTypes';
import { callHotelInfo } from '../services/HotelService';

const FormNewHotel: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextStep = () => {
        switch (step) {
            case 1:
                const formData = new FormData(document.querySelector('#form-edit-hotel') as HTMLFormElement);
                localStorage.setItem('Previousdata', JSON.stringify({
                    id: formData.get('idElement'),
                    name: formData.get('name'),
                    address: formData.get('address'),
                    city: formData.get('city'),
                    nit: formData.get('nit'),
                    roomAmount: formData.get('roomAmount')
                }));
                break;
            case 2:
                if (localStorage.getItem('Previousdata'))
                    localStorage.setItem('editHotelData', localStorage.getItem('Previousdata'));
                break;
            case 3:
                axios.post(`${nextConfig.apiUrl}/hotels/${JSON.parse(localStorage.getItem('editHotelData')!).id}/edit`, {
                    name: JSON.parse(localStorage.getItem('editHotelData')!).name,
                    address: JSON.parse(localStorage.getItem('editHotelData')!).address,
                    city: JSON.parse(localStorage.getItem('editHotelData')!).city,
                    nit: JSON.parse(localStorage.getItem('editHotelData')!).nit,
                    roomamount: JSON.parse(localStorage.getItem('editHotelData')!).roomAmount,
                    dataRooms: localStorage.getItem('dataRooms')
                })
                    .then(response => {
                        window.useHotelDataGrid(
                            window.HotelDataGrid.concat(
                                [
                                    {
                                        name: JSON.parse(localStorage.getItem('editHotelData')!).name,
                                        address: JSON.parse(localStorage.getItem('editHotelData')!).address,
                                        city: JSON.parse(localStorage.getItem('editHotelData')!).city,
                                        nit: JSON.parse(localStorage.getItem('editHotelData')!).nit,
                                        roomAmount: JSON.parse(localStorage.getItem('editHotelData')!).roomAmount
                                    }
                                ]
                            )
                        );
                        localStorage.removeItem('editHotelData');
                        localStorage.removeItem('dataRooms');
                        localStorage.removeItem('Previousdata');
                        window.showAlert();
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
        switch (step) {
            case 2:
                if (localStorage.getItem('Previousdata'))
                    localStorage.setItem('editHotelData', localStorage.getItem('Previousdata'))
            default:
                break;
        }
        setStep(step - 1);
    };

    const closeModal = () => {
        localStorage.removeItem('editHotelData');
        localStorage.removeItem('dataRooms');
        localStorage.removeItem('Previousdata');
        setStep(1);
        setIsModalOpen(false);
    };

    window.openModalEdit = (idHotel: Number) => {
        localStorage.removeItem('editHotelData');
        localStorage.removeItem('dataRooms');
        localStorage.removeItem('Previousdata');
        callHotelInfo(idHotel).then(data => {
            localStorage.setItem('editHotelData', JSON.stringify({
                id: data.data.id,
                name: data.data.name,
                address: data.data.address,
                city: data.data.city,
                nit: data.data.nit,
                roomAmount: data.data.room_amount
            }));
            if (Object.values(data.data.rooms).length) {
                localStorage.setItem('dataRooms', JSON.stringify(data.data.rooms));
            }
            setIsModalOpen(true);
            setStep(1);
        }).catch(error => {
            console.error('There was an error fetching the hotel info!', error);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" style={{ display: isModalOpen ? 'flex' : 'none' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg size-fit">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-700">
                        Editar Hotel
                    </span>
                    <button type="button" className="px-2 bg-gray-300 text-white rounded-lg" onClick={closeModal}>x</button>
                </div>
                {step === 1 && (
                    <div>
                        <h3 className="text-xl text-gray-700 mb-4">Paso 1: Información Básica</h3>
                        <form id="form-edit-hotel">
                            <div className="flex">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Nombre</label>
                                    <input type="hidden" id="idElement" name="idElement" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).id : ''} />
                                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).name : ''} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Dirección</label>
                                    <input type="text" id="address" name="address" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).address : ''} />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">Ciudad</label>
                                    <input type="text" id="city" name="city" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).city : ''} />
                                </div>
                                <div className="mx-2 mb-4 w-1/2">
                                    <label className="block text-gray-700">NIT</label>
                                    <input type="text" id="nit" name="nit" className="w-full px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).nit : ''} />
                                </div>
                            </div>
                            <div className="mx-2 mb-4 w-1/3">
                                <label className="block text-gray-700">Cantidad de Habitaciones</label>
                                <input type="number" id="roomAmount" name="roomAmount" className="w-20 px-3 py-2 border rounded-lg" defaultValue={localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).roomAmount : ''} />
                            </div>
                        </form>
                        <div className="flex justify-between">
                            <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={closeModal}>
                                Cerrar
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
                        <div className="flex justify-between"></div>
                        <button type="button" className="px-4 py-2 bg-gray-300 text-white rounded-lg" onClick={prevStep}>
                            Previous
                        </button>
                        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl mb-4">Paso 3: Revisar Cambios</h3>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).name : ''}</h4>
                            <p><strong className='text-gray-500'>Dirección:</strong> {localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).address : ''}</p>
                            <p><strong className='text-gray-500'>Ciudad:</strong> {localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).city : ''}</p>
                            <p><strong className='text-gray-500'>NIT:</strong> {localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).nit : ''}</p>
                            <p><strong className='text-gray-500'>Cant. Habitaciones:</strong> {localStorage.getItem('editHotelData') ? JSON.parse(localStorage.getItem('editHotelData')!).roomAmount : ''}</p>
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
            </div >
        </div >
    );
};

export default FormNewHotel;
