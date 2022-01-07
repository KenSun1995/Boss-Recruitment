/**
 * build an ajax function to send request to server
 */
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') { // GET
        /**
         * merge parameters into url
         * data: {username: Bob, password: 123}
         * url: ...username=Bob&password=123
         */
        let paramString = '';
        Object.keys(data).forEach(key => {
            paramString += key + '=' + data[key] + '&';
        })
        if (paramString) {
            paramString = paramString.substring(0, paramString.length - 1);
        }
        return axios.get(url + '?' + paramString);
    } else { // POST
        return axios.post(url, data);
    }
}