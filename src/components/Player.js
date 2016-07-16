import React from 'react';
import YoutubePlayer from './YoutubePlayer';

class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: null,
			timer: null,
			volume: 1,
			currentTime: 0,
			duration: 0,
		};

		this.onReady = this.onReady.bind(this);
		this.getVolume = this.getVolume.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.setPlayer = this.setPlayer.bind(this);
		this.setTimerInterval = this.setTimerInterval.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.setCurrentTime = this.setCurrentTime.bind(this);
		this.setDuration = this.setDuration.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.stop = this.stop.bind(this);
	}

	onReady() {
		this.setState({
			volume: this.getVolume(),
		});
		this.play();
		this.setDuration(this.getDuration());
	}
	getVolume() {
		return this.state.player.getVolume() / 100;
	}
	getCurrentTime() {
		return this.state.player.getCurrentTime();
	}
	getDuration() {
		return this.state.player.getDuration();
	}
	setPlayer(player, cb) {
		this.setState({ player }, cb);
	}
	setTimerInterval() {
		clearInterval(this.state.timer);
		this.setState({
			timer: setInterval(() => {
				this.setCurrentTime(this.getCurrentTime());
			}, 25), // interval may change
		});
	}
	setVolume(volume) {
		this.setState({ volume });
		this.state.player.setVolume(volume * 100);
	}
	setCurrentTime(currentTime) {
		this.setState({ currentTime });
	}
	setDuration(duration) {
		this.setState({ duration });
	}
	play() {
		this.state.player.playVideo();
		this.setTimerInterval();
	}
	pause() {
		this.state.player.pauseVideo();
		clearInterval(this.state.timer);
	}
	stop() {
		this.state.player.stopVideo();
		clearInterval(this.state.timer);
		this.setCurrentTime(0);
	}

	render() {
		return (
			<div>
				<YoutubePlayer
					{...this.state}
					onReady={this.onReady}
					getVolume={this.getVolume}
					setPlayer={this.setPlayer}
					setVolume={this.setVolume}
				/>
				<div>
					<button onClick={this.play}>play</button>
					<button onClick={this.pause}>pause</button>
					<button onClick={this.stop}>stop</button>
				</div>
				<div>
					volume:
					<input
						type="number"
						min="0"
						max="1"
						step="0.1"
						value={this.state.volume}
						onChange={e => this.setVolume(e.target.value)}
					/>
				</div>
				<div>
					currentTime:
					{this.state.currentTime}
				</div>
				<div>
					duration:
					{this.state.duration}
				</div>
			</div>
		);
	}
}

export default Player;
