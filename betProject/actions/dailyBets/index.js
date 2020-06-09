import {baseUrlApi} from '../../utils/constant/index';

let date = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year
if(date < 10){
    date = "0" + date;
}
if(month < 10){
    month = "0" + month;
}
let currentDate = date + "-" + month + "-" + year;

const getDailyBets = () => {
    return fetch(baseUrlApi+'dailyBets', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        'date': currentDate,
    })
    })
    .then(res => res.json())
    .then(data => {
        return data.response
    });
  }
export default getDailyBets;

