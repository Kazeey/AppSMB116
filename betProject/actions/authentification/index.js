import baseUrlApi from '../../utils/constant/index';

//Function to call the API to try to login
//The password is not hashed cause in the future
//We will be in HTTPS, and all the data between front and back will be crypted
//By the SSL protocol
const authentification = async (username, password) => {
    const resp = await fetch(baseUrlApi+'login/authentification', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: {
        'username': username,
        'password': password,
    }
    }).then(res => {
        console.log('res', res)
        return 3;
    }).catch(error => {
        //this.error = error.message || error.error
        return 4;
    })
    return resp;
  }
  export default authentification;