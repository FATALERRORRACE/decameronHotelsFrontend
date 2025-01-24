import axios from 'axios';
import nextConfig from '../../next.config';

export const callHotelInfo = async (id:number) => {
    const response = await axios.get(`${nextConfig.apiUrl}/hotels/${id}/data`)
    return response;
}