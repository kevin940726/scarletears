import React from 'react';
import SC from 'soundcloud';

SC.initialize({
	client_id: '15d53e78ff883294640e320b413f4f89',
});

class SoundCloudPlayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: SC,
		};

		SC.resolve(props.trackUrl)
			.then(track => {
				console.log(track);

				this.props.setMetaData({
					id: track.id,
					title: track.title,
				});
				this.props.setDuration(track.duration / 1000);
				return SC.stream(`tracks/${track.id}`);
			})
			.then(player => {
				player.on('time', () => {
					this.props.setCurrentTime(this.props.getCurrentTime());
				});
				this.props.setPlayer(player, this.props.onReady);
			});
	}

	render() {
		return (
			<div>
			</div>
		);
	}
}

export default SoundCloudPlayer;