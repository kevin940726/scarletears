import React from 'react';
import YoutubeIframeLoader from 'youtube-iframe';

class YoutubePlayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: null,
			...props,
		};

		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}
	componentDidMount() {
		YoutubeIframeLoader.load(YT => {
			const player = new YT.Player('player', { // eslint-disable-line no-new
				videoId: '5FjWe31S_0g',
				events: {
					onReady: this.onPlayerReady,
					onStateChange: this.onPlayerStateChange,
				},
			});

			this.setState({ player });
		});
	}

	onPlayerReady() {
		console.log('ready');
		const { player } = this.state;
		this.props.setPlayer(player, this.props.onReady);
	}
	onPlayerStateChange(event) {
		console.log(event.data);
	}

	render() {
		return (
			<div id="player"></div>
		);
	}
}

export default YoutubePlayer;
