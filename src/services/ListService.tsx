import axios from 'axios';
import nextConfig from '../../next.config';

export const listItemsCall = async () => {
    const response = await axios.get(`${nextConfig.apiUrl}/hotels/list`)
    return response;
}