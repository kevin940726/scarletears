import React from 'react';

class Html5Player extends React.Component {
	constructor(props) {
		super(props);

		this.player = null;

		this.durationChange = this.durationChange.bind(this);
		this.loadedMetaData = this.loadedMetaData.bind(this);
		this.timeUpdate = this.timeUpdate.bind(this);
		this.ended = this.ended.bind(this);
		this.removeAllListener = this.removeAllListener.bind(this);
	}
	componentDidMount() {
		this.player = this.refs.player;
		this.props.setPlayer(this.player);
		this.onMountOrLoad(this.props.trackUrl);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.type && nextProps.trackUrl !== this.props.trackUrl) {
			if (nextProps.type === 'html5') { // next track is html5, load up
				if (this.player && this.player.pause) {
					this.player.pause();
				}
				this.onMountOrLoad(nextProps.trackUrl);
			} else if (this.props === 'html5') { // from html5 to non-html5
				this.removeAllListener();
				this.player.seek(0);
				this.player.pause();
			}
		}
	}
	componentWillUnmount() {
		this.removeAllListener();
	}

	onMountOrLoad(trackUrl) {
		this.player.src = trackUrl;
		this.props.onReady();

		this.player.addEventListener('durationchange', this.durationchange);
		this.player.addEventListener('loadedmetadata', this.loadedMetaData);
		this.player.addEventListener('timeupdate', this.timeUpdate);
		this.player.addEventListener('ended', this.ended);
	}
	durationChange() {
		this.props.setDuration(this.player.duration);
	}
	loadedMetaData() {
		this.props.setMetaData({
			title: this.player.currentSrc,
		});
	}
	timeUpdate() {
		this.props.setCurrentTime(this.player.currentTime);
	}
	ended() {
		this.props.onEnd();
	}
	removeAllListener() {
		this.player.removeEventListener('durationChange', this.durationChange);
		this.player.removeEventListener('loadedMetaData', this.loadedMetaData);
		this.player.removeEventListener('timeupdate', this.timeUpdate);
		this.player.removeEventListener('ended', this.ended);
	}

	render() {
		return (<audio ref="player"></audio>);
	}
}

export default Html5Player;
