import {baseUrlApi} from '../../utils/constant/index';

//Function to call the API to recieve the role of the user
//It return all the user info
const checkRole = async(userId) => {
    await fetch(baseUrlApi+'profile/'+userId, {
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
}
export default checkRole;