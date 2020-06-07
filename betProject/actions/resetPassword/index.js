import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to reset the password
const resetPassword = async (username , setMessage) => {
    const resp = await fetch(baseUrlApi+'login/resetPassword', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        'username': username,
    })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.response)
        setMessage('Si votre compte existe sur notre plateforme, un mail de récupération est en route !');
        return data.response
    });
    return resp;
  }
  export default resetPassword;