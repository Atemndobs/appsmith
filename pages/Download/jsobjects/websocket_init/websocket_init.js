export default {
	// url : 'wss://admin.curator.atemkeng.eu/websocket',
	// url : 'wss://http://admin.curator.atemkeng.eu/websocket',
	// access : 'b1BOhQc4SmoU6QISyvq2YiZoGw7Bka_u',
	// collection : 'messages',
	// connection : new WebSocket(this.url),

	connect() {
		const url = 'wss://http://admin.curator.atemkeng.eu/websocket';
		const access_token = 'b1BOhQc4SmoU6QISyvq2YiZoGw7Bka_u';
		// const collection = 'messages';
		const connection = new WebSocket(url);
		console.log('HERE WE GO')
		return connection.addEventListener('open', function() {
			console.log({ event: 'onopen' });
			connection.send(JSON.stringify({ 
				type: 'auth', 
				access_token 
			})); 
		});
	},
	subscribe  () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}