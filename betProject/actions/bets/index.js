import {baseUrlApi} from '../../utils/constant/index';

const getAllBets = () => {
    return fetch(baseUrlApi+'getBets', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => {
        return data.response
    });
  }
export default getAllBets;

