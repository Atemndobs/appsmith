export default {
	play_page_init_data : {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 3,
		'search_hits' : 0,
		'match_limit' : 3,
		'related_songs' : 'my_waymp3'
	},
	
	selectd_song_play (currentSong = {}) {

		appsmith.store.start_song = currentSong;
		search_results_player.isVisible = true;
		song_search_results.isVisible = false;
					
		if(Object.keys(currentSong).length === 0 || currentSong.slug !== "undefined" ){
				appsmith.store.related_songs = currentSong.slug
		}
		get_song_matches.run();
		player_song.autoPlay;
		
		console.log({
			'currentSong_before_match_req' : currentSong,
			'related_song_from_current' : currentSong.slug,
			'related_song_url' : appsmith.store.related_songs
		})
	
		
		setTimeout(
			() => {
				console.log({'related_song_from_store' : appsmith.store.related_songs});
				//get_song_matches.run();
				console.log({'response_': get_song_matches.data()})
			},
			360
		)

		
		return currentSong
	},
	
	get_song_info (currentItem = {}) {
		let happy = currentItem.happy.toFixed(1) * 100 + "%"
		let sad = currentItem.sad.toFixed(1) * 100 + "%"
		let danceability = currentItem.danceability.toFixed(1) * 100 + "%"
		let mood = ""
		if (happy > sad) {
			mood = "happy"
		}else {
			mood = "sad"
		}
		let energy = currentItem.energy.toFixed(1) * 100 + "%"
		return {
			mood,
			energy,
			danceability
		}
	},
	
	search_song () {
		if(search.text === "") {
			return;
		}
		
		console.log(appsmith.store)
		clear_search.isVisible = true
		song_search_api.run()
		song_search_results.isVisible = true
	},
	
	clear_search(){
		search.text = "";
		search.inputText = "";
		search.inputText.trim();
		search.text.trim();
		song_search_results.isVisible = false;
		search_results_player.isVisible = false;
		song_search_api.clear();
		clear_search.isVisible = false
		appsmith.store.related_songs = this.play_page_init_data.related_songs
		// appsmith.store.related_songs = ""
	}
}