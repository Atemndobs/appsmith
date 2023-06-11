export default {
	
		async get_downloaded_song() {
			console.log(appsmith.store)
	  //return this.selectd_song_play()
	},
			async download(dl_source) {
				let response = null
				
				if(dl_source == 'spotify') {
					appsmith.store.spotify_url = link.inputText
					download_spotify.run()
					response =  download_spotify.data
					get_result_button.isVisible = true
					get_result_button.text  = download_spotify.data.data[3]
				}
				if(dl_source == 'sc') {
					appsmith.store.sc_url = link.inputText
					download_sc.run()
					if(download_sc.data){
						get_result_button.isVisible = true
						get_result_button.text = download_sc.data.data[3]
						download_result_link.isVisible = true
					}
					response =  download_sc.data
				}
			console.log({'Store Values' : appsmith.store})
				
	  return response
	}
}