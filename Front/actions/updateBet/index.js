import {baseUrlApi} from '../../utils/constant/index';

//Function to call the API to add a new bet
//It return all the user info
const updateBet = async(teamOne, teamTwo, sport, date, description, winner, stateBet, setMessage) => {
    const newBet = {
        'title': title,
        'date': date,
    }
    await fetch(baseUrlApi+'addNewBet/'+userId, {
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
export default updateBet;