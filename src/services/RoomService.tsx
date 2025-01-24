import axios from 'axios';
import nextConfig from '../../next.config';

export const getRoomSizes = async () => {
    try {
        const response = await axios.get(`${nextConfig.apiUrl}/hotels/rooms/size`);
        return response.data;
    } catch (error) {
        console.error('Error fetching room sizes:', error);
        throw error;
    }
};

export const getRoomTypes = async () => {
    try {
        const response = await axios.get(`${nextConfig.apiUrl}/hotels/rooms/type`);
        return response.data;
    } catch (error) {
        console.error('Error fetching room types:', error);
        throw error;
    }
};