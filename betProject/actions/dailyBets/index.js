import baseUrlApi from '../../utils/constant/index';

//Function to call the API to recieve the profileInfo
//It return all the user info
const getDailyBets = async(userId) => {
    await fetch(baseUrlApi+'dailyBets', {
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
export default getDailyBets;