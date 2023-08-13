export default {
	send_chat () {
		chat.run()
			setTimeout(function() {
				console.log('Executed after 1 second!');
				chat_input.setValue('')
			}, 1000);
		return chat.data
	}
}