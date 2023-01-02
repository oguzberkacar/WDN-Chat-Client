import Cookies from 'js-cookie';

/**
 * Sets the default authorization
 * @param {*} token
 */

class APIClient {
	/**
	 * Fetches data from given url
	 */
	get = (url, token) => {
		let Access_token = token ? token : Cookies.get('access_token');
		var myHeaders = new Headers(); // Creating Header
		myHeaders.append('Content-Type', 'application/json');
		// cors
		myHeaders.append('Access-Control-Allow-Origin', '*');
		// myHeaders.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
		myHeaders.append('Access-Control-Allow-Credentials', 'true');
		myHeaders.append('Authorization', `Bearer ${Access_token}`);

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			// body: raw,
			redirect: 'follow',
		};

		let obj = fetch(`https://api.devapp.one/${url}`, requestOptions)
			.then((response) => {
				return response.text();
			})
			.then((result) => {
				return result;
			});
		return obj;
	};

	/**
	 * post given data to url
	 */
	create = (url, data) => {
		var myHeaders = new Headers(); // Creating Header
		myHeaders.append('Content-Type', 'application/json');
		// cors
		myHeaders.append('Access-Control-Allow-Origin', 'https://wdn-chat-client.vercel.app');

		var raw = JSON.stringify(data);
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		let obj = fetch(`https://api.devapp.one/${url}`, {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		})
			.then((response) => {
				return response.text();
			})
			.then((result) => {
				return result;
			});

		return obj;
	};
}

export { APIClient };
