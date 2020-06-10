import {baseUrlApi} from '../../utils/constant/index';

//Function to call the API to recieve the profileInfo
//It return all the user info

const createAccount = async () => {
    const resp = await fetch(baseUrlApi+'getAllProfiles', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    })
    .then(res => res.json())
    .then(data => {
        return data.response
    });
    return resp;
  }
  export default createAccount;