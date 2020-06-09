import {baseUrlApi} from '../../utils/constant/index';

//Function to call the API to add a new bet
//It return all the user info
const updateBet = async(title, date) => {
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
        body: {
            'newBet': newBet,
        }
        }).then(res => {
        }).catch(error => {
            this.error = error.message || error.error
        })
}
export default updateBet;