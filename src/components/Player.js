/* eslint-disable consistent-return */
import React from 'react';
import YoutubePlayer from './YoutubePlayer';
import SoundCloudPlayer from './SoundCloudPlayer';
import Html5Player from './Html5Player';

const Player = CustomTheme => class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			track: {
				id: '',
				title: '',
			},
			volume: 1,
			currentTime: 0,
			duration: 0,
		};

		this.player = null;

		this.onReady = this.onReady.bind(this);
		this.getVolume = this.getVolume.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.setPlayer = this.setPlayer.bind(this);
		this.setMetaData = this.setMetaData.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.setCurrentTime = this.setCurrentTime.bind(this);
		this.setDuration = this.setDuration.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.stop = this.stop.bind(this);

		this.onEnd = this.props.onEnd || (() => {});
	}

	onReady() {
		if (this.props.type === 'youtube') {
			this.setState({
				volume: this.getVolume(),
			});
			this.play();
			this.setDuration(this.getDuration());
		} else if (this.props.type === 'soundcloud') {
			this.setState({
				volume: this.getVolume(),
			});
			this.play();
		} else if (this.props.type === 'html5') {
			this.setState({
				volume: this.getVolume(),
			});
			this.play();
		}
	}
	getVolume() {
		if (this.props.type === 'youtube') {
			return this.player.getVolume() / 100;
		} else if (this.props.type === 'soundcloud') {
			return this.player.getVolume();
		} else if (this.props.type === 'html5') {
			return this.player.volume;
		}
	}
	getCurrentTime() {
		if (this.props.type === 'youtube') {
			return this.player.getCurrentTime();
		} else if (this.props.type === 'soundcloud') {
			return this.player.currentTime() / 1000;
		} else if (this.props.type === 'html5') {
			return this.player.currentTime;
		}
	}
	getDuration() {
		if (this.props.type === 'youtube') {
			return this.player.getDuration();
		} else if (this.props.type === 'soundcloud') {
			return this.state.duration;
		} else if (this.props.type === 'html5') {
			return this.player.duration;
		}
	}
	setPlayer(player) {
		this.player = player;
	}
	setMetaData(track) {
		this.setState({ track });
	}
	setVolume(volume) {
		if (this.props.type === 'youtube') {
			this.player.setVolume(volume * 100);
		} else if (this.props.type === 'soundcloud') {
			this.player.setVolume(volume);
		} else if (this.props.type === 'html5') {
			this.player.volume = volume;
		}
		this.setState({ volume });
	}
	setCurrentTime(currentTime) {
		this.setState({ currentTime });
	}
	setDuration(duration) {
		this.setState({ duration });
	}
	play() {
		if (this.props.type === 'youtube') {
			this.player.playVideo();
		} else if (this.props.type === 'soundcloud') {
			this.player.play();
		} else if (this.props.type === 'html5') {
			this.player.play();
		}
	}
	pause() {
		if (this.props.type === 'youtube') {
			this.player.pauseVideo();
		} else if (this.props.type === 'soundcloud') {
			this.player.pause();
		} else if (this.props.type === 'html5') {
			this.player.pause();
		}
	}
	stop() {
		if (this.props.type === 'youtube') {
			this.player.stopVideo();
		} else if (this.props.type === 'soundcloud') {
			this.player.seek(0);
			this.player.pause();
		} else if (this.props.type === 'html5') {
			this.player.pause();
			this.player.currentTime = 0;
		}
		this.setCurrentTime(0);
	}

	render() {
		return (
			<div>
				<YoutubePlayer
					type={this.props.type}
					trackUrl={this.props.trackUrl}
					onReady={this.onReady}
					onEnd={this.onEnd}
					getVolume={this.getVolume}
					getCurrentTime={this.getCurrentTime}
					setPlayer={this.setPlayer}
					setMetaData={this.setMetaData}
					setVolume={this.setVolume}
					setCurrentTime={this.setCurrentTime}
					stop={this.stop}
				/>
				<SoundCloudPlayer
					type={this.props.type}
					trackUrl={this.props.trackUrl}
					onReady={this.onReady}
					onEnd={this.onEnd}
					getVolume={this.getVolume}
					getCurrentTime={this.getCurrentTime}
					setPlayer={this.setPlayer}
					setMetaData={this.setMetaData}
					setVolume={this.setVolume}
					setCurrentTime={this.setCurrentTime}
					setDuration={this.setDuration}
					stop={this.stop}
				/>
				<Html5Player
					type={this.props.type}
					trackUrl={this.props.trackUrl}
					onReady={this.onReady}
					onEnd={this.onEnd}
					getVolume={this.getVolume}
					getCurrentTime={this.getCurrentTime}
					setPlayer={this.setPlayer}
					setMetaData={this.setMetaData}
					setVolume={this.setVolume}
					setCurrentTime={this.setCurrentTime}
					setDuration={this.setDuration}
					stop={this.stop}
				/>

				<CustomTheme
					// event
					onReady={this.onReady}
					// method
					getVolume={this.getVolume}
					getCurrentTime={this.getCurrentTime}
					getDuration={this.getDuration}
					setPlayer={this.setPlayer}
					setTimerInterval={this.setTimerInterval}
					setVolume={this.setVolume}
					setCurrentTime={this.setCurrentTime}
					setDuration={this.setDuration}
					play={this.play}
					pause={this.pause}
					stop={this.stop}
					prevTrack={this.props.prevTrack}
					nextTrack={this.props.nextTrack}
					// state
					track={this.state.track}
					volume={this.state.volume}
					currentTime={this.state.currentTime}
					duration={this.state.duration}
				/>
			</div>
		);
	}
};

export const DefaultTheme = props => (
	<div>
		<h3>{props.track.title}</h3>
		<div>
			<button onClick={props.play}>play</button>
			<button onClick={props.pause}>pause</button>
			<button onClick={props.stop}>stop</button>
		</div>
		<div>
			<button onClick={props.prevTrack}>prev</button>
			<button onClick={props.nextTrack}>next</button>
		</div>
		<div>
			volume:
			<input
				type="number"
				min="0"
				max="1"
				step="0.1"
				value={props.volume}
				onChange={e => props.setVolume(e.target.value)}
			/>
		</div>
		<div>
			currentTime: {props.currentTime}
		</div>
		<div>
			duration: {props.duration}
		</div>
	</div>
);

export default Player;
