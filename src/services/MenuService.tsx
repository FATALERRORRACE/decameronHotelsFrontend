import axios from 'axios';
export const menuItemsCall = async () => {
    const response = await axios.get('http://hoteles-decameron.test/api/menu')
    return response;
}

export const openMenuSelected = async (menuId: number) => {
    var url = '';
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