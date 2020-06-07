import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to try to login
//The password is not hashed cause in the future
//We will be in HTTPS, and all the data between front and back will be crypted
//By the SSL protocol
const createAccount = async (name, firstname, username, password, mail) => {
    const resp = await fetch(baseUrlApi+'login/createAccount', {
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
    })
    })
    .then(res => res.json())
    .then(data => {
        return data.response
    });
    return resp;
  }
  export default createAccount;

