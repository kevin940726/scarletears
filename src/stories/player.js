import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player, { DefaultTheme } from '../components/Player';
import PlayList from '../components/PlayList';

const MyPlayer = Player(DefaultTheme);

storiesOf('Player', module)
	.add('Youtube', () => (
		<MyPlayer
			type="youtube"
			trackUrl="5FjWe31S_0g"
		/>
	))
	.add('SoundCloud', () => (
		<MyPlayer
			type="soundcloud"
			trackUrl="https://soundcloud.com/anatu/bleach"
		/>
	))
	.add('list of 2 Youtube', () => {
		const MyPlayList = PlayList(MyPlayer);
		const playlist = [
			{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
			{ type: 'youtube', trackUrl: 'FVpG-RtZFE0' },
		];

		return (
			<MyPlayList
				playlist={playlist}
			/>
		);
	})
	.add('empty', () => (
		<div></div>
	));
