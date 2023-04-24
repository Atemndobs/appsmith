export default {
	search_results_player: {
		'show' : false,
		'currentSong' : {},
		'search_limit' : 3,
		'search_hits' : 0
	},
	selectd_song_play (currentSong = {}) {

		console.log(currentSong)
		search_results_player.show = true
		search_results_player.isVisible = true
		song_search_results.isVisible = false
		player_song.autoPlay
		return currentSong
	},
	async get_related_songs (currentSong = {}) {
		let related_url = currentSong.related_songs ?? "";
		console.log({ related_url });

	}
}