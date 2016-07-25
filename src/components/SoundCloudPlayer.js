import React from 'react';
import SC from 'soundcloud';

SC.initialize({
	client_id: '15d53e78ff883294640e320b413f4f89',
});

class SoundCloudPlayer extends React.Component {
	constructor(props) {
		super(props);

		this.player = SC;

		this.onMountOrLoad = this.onMountOrLoad.bind(this);

		if (this.props.type === 'soundcloud') {
			this.onMountOrLoad(this.props.trackUrl);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.type && nextProps.trackUrl !== this.props.trackUrl) {
			if (nextProps === 'soundcloud') { // next track is soundcloud, load up the track.
				this.onMountOrLoad(nextProps.trackUrl);
			} else if (this.props.type === 'soundcloud') { // from soundcloud to non-soundcloud, clean up the event.
				this.player.off('time');
				this.player.seek(0);
				this.player.pause();
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
					this.props.onEnd();
				});
				player.on('buffering_start', () => {
					this.props.setVolume(this.props.getVolume());
				});

				this.player = player;
				this.props.setPlayer(player);
				this.props.onReady();
			});
	}

	render() {
		return (<div></div>);
	}
}

export default SoundCloudPlayer;
