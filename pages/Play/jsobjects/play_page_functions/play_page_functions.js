export default {
	play_page_init_data : {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 3,
		'search_hits' : 0,
		'match_limit' : 3,
		'related_songs' : 'my_waymp3'
	},

	show_details() {
		if(playing_song_info.isVisible === false) {
			playing_song_info.isVisible = true
			mood_button.isVisible = true
		}else{
			playing_song_info.isVisible = false
			mood_button.isVisible = false
		}
	},
	show_start_song(){
		if(song_detail_table.isVisible === false) {
			song_detail_table.isVisible = true
		}else{
			song_detail_table.isVisible = false
		}
	},
	show_refine(){
		if(refine_options.isVisible === false) {
			refine_options.isVisible = true
		}else{
			refine_options.isVisible = false
		}
	},
	set_option(){
		appsmith.store.options = refine_options.selectedOptionValues
		if(appsmith.store.options.length == 0) {
			console.log({
				"First_song" :  appsmith.store.first_song,
			})
			this.selectd_song_play(appsmith.store.first_song)
		}
	},

	start_song_play(currentSong) {
		appsmith.store.first_song = currentSong
		this.selectd_song_play(currentSong)
	},

	selectd_song_play (currentSong = {}) {
		appsmith.store.song_id = currentSong.id
		search.isVisible = false
		related_songs.isVisible = true

		player_image.image= currentSong.image ?? ""
		appsmith.store.start_song = currentSong;
		appsmith.store.current_song = currentSong;
		search_results_player.isVisible = true;
		song_search_results.isVisible = false;

		if(Object.keys(currentSong).length === 0 || currentSong.slug !== "undefined" ){
			appsmith.store.slug = currentSong.slug
		}


		song_search_results.selectedItem.image = currentSong.image

		get_song_matches.run();
		player_song.autoPlay;
		now_playing_bar.text = currentSong.title + " by " + currentSong.author
		playing_song_info.text = 
			"Title : " + currentSong.title + "\n" +
			"Author : " + currentSong.author + "\n" +
			"Genre : " + currentSong.genre + "\n" +
			"BPM : " + currentSong.bpm + "\n" +
			"Key : " + currentSong.key + currentSong.scale + "\n" ;

		return currentSong
	},

	related_song_play(currentSong) {
		return this.selectd_song_play()
	},

	get_song_info (currentItem = {}) {
		let happy = currentItem.happy.toFixed(1) * 100 + "%"
		let sad = currentItem.sad.toFixed(1) * 100 + "%"
		let danceability = currentItem.danceability.toFixed(1) * 100 + "%"
		let genre = 'not defined'
		try{
			genre = currentItem.genre
		}catch(error){
			console.log(error)
		}
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
			danceability,
			genre
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
		//appsmith.store.slug = "jarreau_vandal_westsidemp3"
		search.isVisible = true
		search.text = "";
		search.inputText = "";
		search.inputText.trim();
		search.text.trim();
		song_search_results.isVisible = false;
		search_results_player.isVisible = false;
		song_search_api.clear();
		clear_search.isVisible = false
		related_songs.isVisible = false
		get_match_criteria.clear()
		clear_match_criteria.run()
	}
}