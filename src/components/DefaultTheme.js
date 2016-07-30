import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DefaultTheme.css';

const DefaultTheme = (props) => (
	<div styleName="player">
		<h3>{props.track.title}</h3>
		<div>
			<button onClick={props.togglePlay}>play</button>
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

export default CSSModules(DefaultTheme, styles);
