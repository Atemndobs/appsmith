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
			energy_button.isVisible = true
			bpm_button.isVisible = true
			key_button.isVisible = true
		}else{
			playing_song_info.isVisible = false
			mood_button.isVisible = false
			energy_button.isVisible = false
			bpm_button.isVisible = false
			key_button.isVisible = false
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
			//refine_options.isVisible = true
		}else{
			//refine_options.isVisible = false
		}

		if(options_switch_group.isVisible === false) {
			options_switch_group.isVisible = true
		}else{
			options_switch_group.isVisible = false
		}
	},
	set_option(){
		appsmith.store.options = refine_options.selectedOptionValues
		this.selectd_song_play(appsmith.store.first_song)
	},
	set_option_switch(){
		appsmith.store.options = options_switch_group.selectedValues
		console.log({
			'selected_OPTIONS' : appsmith.store.options 
		})
		this.selectd_song_play(appsmith.store.first_song)
	},

	start_song_play(currentSong) {
		appsmith.store.first_song = currentSong
		this.selectd_song_play(currentSong)
	},

	selectd_song_play (currentSong = {}) {
		appsmith.store.song_id = currentSong.id
		search.isVisible = false
		search_button.isVisible = false
		related_songs.isVisible = true

		player_image.image= currentSong.image ?? ""
		appsmith.store.start_song = currentSong;
		appsmith.store.current_song = currentSong;
		search_results_player.isVisible = true;
		song_search_results.isVisible = false;

		if(Object.keys(currentSong).length === 0 || currentSong.slug !== "undefined" ){
			appsmith.store.slug = currentSong.slug
		}


		let energy = currentSong.energy.toFixed(1) * 100 + "%"

		song_search_results.selectedItem.image = currentSong.image
		mood_button.text = this.getMood(currentSong)
		energy_button.text = energy
		bpm_button.text = currentSong.bpm + 'bpm'
		key_button.text = currentSong.key 
		//+ currentSong.scale


		get_song_matches.run();
		player_song.autoPlay;
		now_playing_bar.text = currentSong.title + " by " + currentSong.author
		playing_song_info.text = 
			"Title : " + currentSong.title + "\n" +
			"Author : " + currentSong.author + "\n" +
			"Genre : " + currentSong.genre + "\n" ;

		return currentSong
	},

	related_song_play(currentSong) {
		return this.selectd_song_play()
	},

	get_song_info (currentItem = {}) {
		let danceability = currentItem.danceability.toFixed(1) * 100 + "%"
		let genre = 'not defined'
		let bpm = currentItem.bpm
		let key = currentItem.key + currentItem.scale
		try{
			genre = currentItem.genre
			if(genre == 'undefined') {
				genre = 'Genre is missing'
			}
		}catch(error){
			console.log(error)
		}

		let mood = this.getMood(currentItem)

		let energy = currentItem.energy.toFixed(1) * 100 + "%"
		return {
			mood,
			energy,
			danceability,
			genre,
			bpm,
			key
		}
	},

	getMood(currentItem) {
		let happy = currentItem.happy.toFixed(1) * 100 + "%"
		let sad = currentItem.sad.toFixed(1) * 100 + "%"
		let mood = ""
		if (happy > sad) {
			mood = "happy"
		}else {
			mood = "sad"
		}
		return mood;
	},

	search_song () {
		search.text = ""
		search.inputText = ""
		clear_search.isVisible = true
		search_button.isVisible = false
		//song_search_api.run()
		song_search_results.isVisible = true
	},

	clear_search(){
		appsmith.store.options = []
		search.isVisible = true;
		search_button.isVisible = true;
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