export default {

	async get_downloaded_song() {
		console.log(appsmith.store)
		//return this.selectd_song_play()
	},
	async download(dl_source) {
		let response = null

		if(dl_source == 'spotify') {
			submit_download_button.isDisabled = true
			submit_download_button.text = "Download in Progress ..."
			link.isDisabled = true;
			link.isVisible = false;
			appsmith.store.spotify_url = link.inputText;
			download_spotify.run();
			response =  download_spotify.data;
			//get_result_button.isVisible = true;
			//get_result_button.text  = download_spotify.data.data[7];
			// link.isVisible = false;
		}
		if(dl_source == 'sc') {
			appsmith.store.sc_url = link.inputText
			download_sc.run()
			if(download_sc.data){
				get_result_button.isVisible = true
				get_result_button.text = download_sc.data.data[3]
			}
			response =  download_sc.data
		}
		console.log({'Store Values' : appsmith.store})
		return response
	},
	async clear() {
		link.isVisible = true
		download_songs.isVisible = true;
		get_result_button.isDisabled = true;
		get_result_button.isVisible = false;
		link.inputText = "";
		return true;
	},
	async reset_form(){
		download_songs.isVisible = true;
		get_result_button.isDisabled = true;
		get_result_button.isVisible = false;
		submit_download_button.isVisible = true;
		submit_download_button.isDisabled = false;
		submit_download_button.text = "Download"
		link.inputText = "";
		link.text = "";
		link.text.trim();
		link.isDisabled = true;
		link.isVisible = false;
		// source.selectedOptionValue = this.swichValue(source.selectedOptionValue)
		// source.selectedOptionLabel = this.swichValue(source.selectedOptionLabel)
		source.selectedOptionValue = "spotify";
		source.selectedOptionLabel = "spotify";

		let message = {
			'link input text' : link.inputText,
			'link  text' : link.inputText,
			'get reult button visible' : get_result_button.isVisible,
			'get reult button Disabled' : get_result_button.isDisabled,
			'submit button': submit_download_button.isVisible,
			'source value' : source.selectedOptionValue,
			'source label' : source.selectedOptionLabel
		}
		console.log(message)
		return message
	},

	swichValue(in_val) {
		if(in_val == "spotify"){
			return "soundcloud"
		}
		if(in_val = "soundcloud") {
			return "spotify"
		}
	},

	activate_download() {
		link.isDisabled = false
		link.isVisible = true
		submit_download_button.isDisabled = false
	}
}