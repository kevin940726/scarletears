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

		this.onMountOrLoad = this.onMountOrLoad.bind(this);

		if (this.props.type === 'soundcloud') {
			console.log('construct');
			this.onMountOrLoad(this.props.trackUrl);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.type && nextProps.trackUrl !== this.props.trackUrl) {
			if (nextProps.type !== 'soundcloud') {
				this.state.player.off('time');
				this.state.player.seek(0);
				this.state.player.pause();
			} else {
				this.onMountOrLoad(nextProps.trackUrl);
			}
		}
	}

	onMountOrLoad(trackUrl) {
		SC.resolve(trackUrl)
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
				player.on('finish', () => {
					console.log('end');
					this.props.onEnd();
				});

				this.setState({ player });
				this.props.setPlayer(player, this.props.onReady);
			});
	}

	render() {
		return (<div></div>);
	}
}

export default SoundCloudPlayer;
