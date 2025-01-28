import axios from 'axios';
import nextConfig from '../../next.config';

export const menuItemsCall = async () => {
    const response = await axios.get(`${nextConfig.apiUrl}/menu`)
    return response;
}

export const openMenuSelected = async (menuId: number) => {
    let url = '';
    switch(menuId){
        case 1:
            url = 'api/list';
        case 2:
            url = 'api/new';
        case 3:
            url = 'api/edit/';
    }
    const response = await axios.get(url);
    return response;
}