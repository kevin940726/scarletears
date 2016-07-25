import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DefaultTheme.css';


class DefaultTheme extends React.Component {
	constructor(props) {
		super(props);

		this.togglePlay = this.togglePlay.bind(this);
	}

	togglePlay() {
		if (this.props.getPlayerState()) {
			this.props.pause();
		} else {
			this.props.play();
		}
	}

	render() {
		return (
			<div styleName="player">
				<h3>{this.props.track.title}</h3>
				<div>
					<button onClick={this.togglePlay}>play</button>
					<button onClick={this.props.stop}>stop</button>
				</div>
				<div>
					<button onClick={this.props.prevTrack}>prev</button>
					<button onClick={this.props.nextTrack}>next</button>
				</div>
				<div>
					volume:
					<input
						type="number"
						min="0"
						max="1"
						step="0.1"
						value={this.props.volume}
						onChange={e => this.props.setVolume(e.target.value)}
					/>
				</div>
				<div>
					currentTime: {this.props.currentTime}
				</div>
				<div>
					duration: {this.props.duration}
				</div>
			</div>
		);
	}
}

export default CSSModules(DefaultTheme, styles);
