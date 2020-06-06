import baseUrlApi from '../../utils/constant/index';

//Function to call the API to get statistique
//It return all the user info
const getStats = async(userId) => {
    await fetch(baseUrlApi+'addNewBet/'+userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }).then(res => {
        console.log('res', res)
    }).catch(error => {
        this.error = error.message || error.error
    })
}
export default getStats;