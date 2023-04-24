export default {
	search_results_player: {
		'show' : false,
		'currentSong' : {}
	},
	selectd_song_play (currentSong = {}) {
		
		search_results_player.show = true
		player_song.autoPlay
		return currentSong.path ?? ""
	},
	async get_related_songs (currentSong = {}) {
		let related_url = currentSong.related_songs ?? "";
		console.log({ related_url });
		
	}
}