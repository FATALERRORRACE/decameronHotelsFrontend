import axios from 'axios';
export const listItemsCall = async () => {
    const response = await axios.get('http://hoteles-decameron.test/api/list')
    return response;
}