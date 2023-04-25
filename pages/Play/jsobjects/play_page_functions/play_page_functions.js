export default {
	search_results_player: {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 3,
		'search_hits' : 0,
		'match_limit' : 3,
		'related_songs' : "dj_zinhle_indlovu_feat_loyisomp3"
	},
	
	selectd_song_play (currentSong = {}) {
		search_results_player.isVisible = true;
		song_search_results.isVisible = false;
		player_song.autoPlay;
		search_results_player.related_songs = currentSong.related_songs
		let song_matches = get_song_matches.run()
		
		console.log(get_song_matches.data)
		
		return currentSong
	},
	
	get_song_info (currentItem = {}) {
		let happy = currentItem.happy.toFixed(1) * 100 + "%"
		let sad = currentItem.sad.toFixed(1) * 100 + "%"
		let mood = ""
		if (happy > sad) {
			mood = "happy"
		}else {
			mood = "sad"
		}
		let energy = currentItem.energy.toFixed(1) * 100 + "%"
		return {
			mood,
			energy
		}
	},
	
	search_song () {
		if(search.text === "") {
			return;
		}
		clear_search.isVisible = true
		song_search_api.run()
		song_search_results.isVisible = true
	},
	
	async clear_search(){
		song_search_results.isVisible = false;
		search_results_player.isVisible = false;
		song_search_api.clear();
		clear_search.isVisible = false
		search.text = "";
	
	}
}