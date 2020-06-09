import { baseUrlApi } from '../../utils/constant/index';

//Function to call the API to try to create a new bet
const createBet = async (teamOne, teamTwo, sport, date, valueOne, valueTwo, mean, homeTeam, setMessage) => {
    const resp = await fetch(baseUrlApi+'createBet', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        'teamOne': teamOne,
        'teamTwo': teamTwo,
        'sport': sport,
        'date': date,
        'homeTeam': homeTeam,
        'mean' : mean,
        'valueOne' : valueOne,
        'valueTwo' : valueTwo,
        'siteKey' : "TvsProno"
    })
    })
    .then(res => res.json())
    .then(data => {
        setMessage(data.response);
        return data.response
    });
    return resp;
  }
  export default createBet;