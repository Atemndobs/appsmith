export default {

	async get_downloaded_song() {
		console.log(appsmith.store)
		//return this.selectd_song_play()
	},
	async download(dl_source) {
		let response = null

		if(dl_source == 'spotify') {
			submit_download_button.setDisabled(true);
			submit_download_button.setLabel("Download in Progress ...")
			link.setDisabled(true);
			link.setVisibility(false)
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
				get_result_button.setVisibility(true)
				get_result_button.setLabel(download_sc.data.data[3])
			}
			response =  download_sc.data
		}
		console.log({'Store Values' : appsmith.store})
		return response
	},
	async clear() {
		link.setVisibility(true)
		download_songs.setVisibility(true)
		get_result_button.setDisabled(true);
		get_result_button.setVisibility(false)
		link.setValue("")
		return true;
	},

	async reset_form(){

		search_spotify_container.setVisibility(true)
		search_spotify.setVisibility(true)
		search_spotify_button.setVisibility(true)
		download_songs.setVisibility(true)
		get_result_button.setDisabled(true);
		get_result_button.setVisibility(false)
		submit_download_button.setVisibility(true)
		submit_download_button.setDisabled(false);

		submit_download_button.setLabel("Download")
		link.setValue("")
		link.setDisabled(true);
		link.setVisibility(false);
		// source.selectedOptionValue = this.swichValue(source.selectedOptionValue)
		// source.selectedOptionLabel = this.swichValue(source.selectedOptionLabel)
		// source.selectedOptionValue = "spotify";
		source.setSelectedOption("spotify")
		// source.selectedOptionLabel = "spotify";

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
		link.setDisabled(false)
		link.setVisibility(true)
		submit_download_button.setDisabled(false)
	},
	set_spotify_link(){
		// link.text = spotify_search_song.data.share_url
	},
	search() {
		spotify_search_song.run()
		let searchResult = spotify_search_song.data
		var resultText = 'Add Download Link :' + searchResult.title + ' by ' + searchResult.artist
		spotify_song_info.setVisibility(true)
		spotify_song_info.setLabel(resultText)
		search_spotify_image.setVisibility(true)
		spotify_song_info.setVisibility(true)


		console.log({
			'SERACH RESULT' : searchResult
		})
	}
}