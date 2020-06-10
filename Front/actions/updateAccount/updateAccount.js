import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to try to create an account
const updateAccount = async (name, firstname, username, password, mail, userId, setMessage) => {
    const resp = await fetch(baseUrlApi+'login/updateAccount/'+userId, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        'name': name,
        'firstname': firstname,
        'username': username,
        'password': password,
        'mail': mail,
        'userId': userId,
    })
    })
    .then(res => res.json())
    .then(data => {
        setMessage(data.response);
        return data.response
    });
    return resp;
  }
  export default updateAccount;

