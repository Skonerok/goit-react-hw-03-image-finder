import axios from 'axios';

const API_KEY = '36043841-d1f663e1c84af1682a6f63198';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(searchQuery, page) {

   const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    
    return response.data;
    
};

export default fetchImages;

