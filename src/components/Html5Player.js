import React from 'react';

class Html5Player extends React.Component {
	constructor(props) {
		super(props);

		this.player = null;
	}
	componentDidMount() {
		this.player = this.refs.player;
		this.props.setPlayer(this.player);
		this.props.onReady();

		this.player.addEventListener('durationchange', () => {
			this.props.setDuration(this.player.duration);
		});
		this.player.addEventListener('loadedmetadata', () => {
			this.props.setMetaData({
				title: this.player.currentSrc,
			});
		});
		this.player.addEventListener('timeupdate', () => {
			this.props.setCurrentTime(this.player.currentTime);
		});
	}

	render() {
		return (<audio ref="player" src={this.props.trackUrl}></audio>);
	}
}

export default Html5Player;
