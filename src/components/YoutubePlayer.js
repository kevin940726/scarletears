import React from 'react';
import YoutubeIframeLoader from 'youtube-iframe';

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/videos';
const API_KEY = 'AIzaSyDUnpotytLIiayoXXydWuPf-iWH6KoDJbI';

class YoutubePlayer extends React.Component {
	constructor(props) {
		super(props);

		this.player = null;
		this.timer = null;
		this.loaded = false;

		this.onMountOrLoad = this.onMountOrLoad.bind(this);
		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
		this.setTimerInterval = this.setTimerInterval.bind(this);
		this.clearTimerInterval = this.clearTimerInterval.bind(this);
	}
	componentDidMount() {
		YoutubeIframeLoader.load(() => {
			if (this.props.type === 'youtube') {
				this.onMountOrLoad(this.props.trackUrl);
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.type && nextProps.trackUrl !== this.props.trackUrl) {
			this.loaded = false;

			if (nextProps.type === 'youtube') { // next track is youtube, load up
				if (this.player) {
					this.player.loadVideoById(nextProps.trackUrl);
				} else {
					this.onMountOrLoad(nextProps.trackUrl);
				}
			} else if (this.props.type === 'youtube') { // from youtube to non-youtube
				this.player.stopVideo();
				this.clearTimerInterval();
			}
		}
	}
	componentWillUnmount() {
		this.clearTimerInterval();
	}

	onMountOrLoad(trackUrl) {
		this.player = new window.YT.Player('player', { // eslint-disable-line no-new
			videoId: trackUrl,
			events: {
				onReady: this.onPlayerReady,
				onStateChange: this.onPlayerStateChange,
			},
		});
	}
	onPlayerReady() {
		console.log('ready');
		this.loaded = true;
		this.props.setPlayer(this.player);
		this.props.onReady();

		fetch(`${YOUTUBE_API}?part=snippet&id=${this.props.trackUrl}&key=${API_KEY}`)
			.then(res => res.json())
			.then(track => {
				this.props.setMetaData({
					title: track.items[0].snippet.title,
				});
			});
	}
	onPlayerStateChange(event) {
		console.log('state change: ', event.data);
		if (event.data === 1) { // playing
			if (!this.loaded) {
				this.onPlayerReady();
			}
			this.setTimerInterval();
		} else {
			this.clearTimerInterval();

			if (event.data === 0) { // ended
				this.props.onEnd();
			}
		}
	}
	setTimerInterval() {
		clearInterval(this.timer);
		this.timer = setInterval(() => {
			this.props.setCurrentTime(this.props.getCurrentTime());
		}, 300); // interval may change
	}
	clearTimerInterval() {
		clearInterval(this.timer);
		this.timer = null;
	}

	render() {
		return (
			<div id="player" style={{ display: 'none' }}></div>
		);
	}
}

export default YoutubePlayer;
