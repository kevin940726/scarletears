import React from 'react';

const PlayList = Player => class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playlist: props.playlist || [],
			currentTrack: 0,
		};

		this.prevTrack = this.prevTrack.bind(this);
		this.nextTrack = this.nextTrack.bind(this);
	}

	prevTrack() {
		this.setState({ currentTrack: this.state.currentTrack - 1 });
	}
	nextTrack() {
		console.log('next');
		this.setState({ currentTrack: this.state.currentTrack + 1 });
	}

	render() {
		return (
			<div>
				<Player
					type={this.props.playlist[this.state.currentTrack].type}
					trackUrl={this.props.playlist[this.state.currentTrack].trackUrl}
					onEnd={this.nextTrack}
					nextTrack={this.nextTrack}
					prevTrack={this.prevTrack}
				/>
			</div>
		);
	}
};

export default PlayList;
