export default {
	play_page_init_data : {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 9,
		'search_hits' : 0,
		'match_limit' : 9,
		'related_songs' : ''
	},

	show_details() {
		if(!playing_song_info.isVisible) {
			playing_song_info.setVisibility(true)
			mood_button.setVisibility(true)
			energy_button.setVisibility(true)
			bpm_button.setVisibility(true)
			key_button.setVisibility(true)
		}else{
			playing_song_info.setVisibility(false)
			mood_button.setVisibility(false)
			energy_button.setVisibility(false)
			bpm_button.setVisibility(false)
			key_button.setVisibility(false)
		}
	},
	show_start_song(){
		if(!song_detail_table.isVisible) {
			song_detail_table.setVisibility(true)
		}else{
			song_detail_table.setVisibility(false)
		}
	},
	show_refine(){
		if(refine_options.setVisibility(false)) {
			//refine_options.setVisibility(true)
		}else{
			//refine_options.setVisibility(false)
		}

		if(!options_switch_group.isVisible) {
			options_switch_group.setVisibility(true)
		}else{
			options_switch_group.setVisibility(false)
		}
	},
	set_option(){
		storeValue('options', refine_options.selectedOptionValues);
		//storeValue('options', 'ATEM');
		console.log({
			'selected_OPTIONS STORE VALUE' : appsmith.store.options
		})

		this.selectd_song_play(appsmith.store.first_song)
	},
	set_option_switch(){
		storeValue('options', options_switch_group.selectedValues);
		console.log({
			'selected_OPTIONS' : appsmith.store.options 
		})
		this.selectd_song_play(appsmith.store.first_song)
	},

	start_song_play(currentSong) {
		storeValue('first_song', currentSong);
		console.log({
			'currentSong' : appsmith.store.options 
		})
		this.selectd_song_play(currentSong)
	},

	selectd_song_play (currentSong = {}) {

		// appsmith.store.song_id = currentSong.id
		storeValue('song_id', currentSong.id);
		search.setVisibility(false)
		search_button.setVisibility(false)
		related_songs.setVisibility(true)

		player_image.setImage(currentSong.image ?? "")
		// appsmith.store.start_song = currentSong;
		//appsmith.store.current_song = currentSong;
		storeValue('start_song', currentSong);
		storeValue('current_song', currentSong);
		search_results_player.setVisibility(true);
		song_search_results.setVisibility(false);

		if(Object.keys(currentSong).length === 0 || currentSong.slug !== "undefined" ){
			// appsmith.store.slug = currentSong.slug
			storeValue('slug', currentSong.slug);
		}


		let energy = currentSong.energy  ? currentSong.energy.toFixed(1) * 100 + "%" : 0 + "%"

		song_search_results.selectedItem.image = currentSong.image
		mood_button.setLabel(this.getMood(currentSong)) 
		energy_button.setLabel(energy)
		bpm_button.setLabel(currentSong.bpm + 'bpm')
		key_button.setLabel(currentSong.key )
		//+ currentSong.scale


		get_song_matches.run();
		player_song.autoPlay;
		now_playing_bar.setLabel(currentSong.title + " by " + currentSong.author)
		let info = "Title : " + currentSong.title + "\n" +
				"Author : " + currentSong.author + "\n" +
				"Genre : " + currentSong.genre + "\n" ;
		playing_song_info.setText(info)


		return currentSong
	},

	related_song_play() {
		return this.selectd_song_play()
	},

	get_song_info (currentItem = {}) {
		let danceability = currentItem.danceability ? currentItem.danceability.toFixed(1) * 100 + "%" : 0
		let genre = 'not defined'
		let bpm = currentItem.bpm ?? 0
		let key = currentItem.key + currentItem.scale ?? ""
		try{
			genre = currentItem.genre
			if(genre == 'undefined') {
				genre = 'Genre is missing'
			}
		}catch(error){
			console.log(error)
		}

		let mood = this.getMood(currentItem)

		let energy = currentItem.energy ? currentItem.energy.toFixed(1) * 100 + "%" : 0
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
		let happy = currentItem.happy ? currentItem.happy.toFixed(1) * 100 + "%" : 0
		let sad = currentItem.sad ?  currentItem.sad.toFixed(1) * 100 + "%" : 0
		let mood = ""
		if (happy > sad) {
			mood = "happy"
		}else {
			mood = "sad"
		}
		return mood;
	},

	search_song () {
		search.setValue("")
		clear_search.setVisibility(true)
		search_button.setVisibility(false)
		//song_search_api.run()
		song_search_results.setVisibility(true)
	},

	clear_search(){
		// appsmith.store.options = []
		storeValue('options', []);
		search.setVisibility(true);
		search_button.setVisibility(true);
		search.setValue("");
		search.inputText.trim();
		search.text.trim();
		song_search_results.setVisibility(false);
		search_results_player.setVisibility(false);
		song_search_api.clear();
		clear_search.setVisibility(false)
		related_songs.setVisibility(false)
		get_match_criteria.clear()
		clear_match_criteria.run()
	}
}