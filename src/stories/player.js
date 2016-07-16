import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player from '../components/Player';

storiesOf('Player', module)
	.add('Youtube', () => (
		<Player />
	))
	.add('empty', () => (
		<div></div>
	));
