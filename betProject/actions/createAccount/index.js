import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to try to create an account
const createAccount = async (name, firstname, username, mail, setMessage) => {
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
        'mail': mail,
    })
    })
    .then(res => res.json())
    .then(data => {
        setMessage(data.response);
        return data.response
    });
    return resp;
  }
  export default createAccount;

