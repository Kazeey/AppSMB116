import {baseUrlApi} from '../../utils/constant/index';

//Function to call the API to add a new bet
//It return all the user info
const updateBet = async(teamOne, teamTwo, sport, date, description, winner, betId, setMessage) => {
    const resp = await fetch(baseUrlApi+'betById/'+betId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'betId' : betId,
            'teamOne': teamOne,
            'teamTwo': teamTwo,
            'sport': sport,
            'date': date,
            'description' : description,
            'winner' : winner,
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