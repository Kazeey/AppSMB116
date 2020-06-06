import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to try to login
//The password is not hashed cause in the future
//We will be in HTTPS, and all the data between front and back will be crypted
//By the SSL protocol
const authentification = async (username, password) => {
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year

    if(date < 10){
        date = "0"+date;
    }

    if(month < 10){
        month = "0"+month;
    }
    
    let dateFinale = date + "/" + month + "/" + year
    const resp = await fetch(baseUrlApi+'login/authentification', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        'username': username,
        'password': password,
        'date': dateFinale,
    })
    }).then(res => {
        console.log('res', res)
        return 3;
    }).catch(error => {
        //this.error = error.message || error.error
        return error;
    })
    return resp;
  }
  export default authentification;