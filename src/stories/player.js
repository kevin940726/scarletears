import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player, { DefaultTheme } from '../components/Player';
import PlayList from '../components/PlayList';

const MyPlayer = Player(DefaultTheme);

const MyPlayList = PlayList(MyPlayer);

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
	.add('list of 2 Youtube', () => (
		<MyPlayList
			playlist={[
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
				{ type: 'youtube', trackUrl: 'FVpG-RtZFE0' },
			]}
		/>
	))
	.add('list of 2 SoundCloud', () => (
		<MyPlayList
			playlist={[
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/anatu/bleach' },
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/iamdogibson/permanentone' },
			]}
		/>
	))
	.add('Youtube then SoundCloud', () => (
		<MyPlayList
			playlist={[
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/iamdogibson/permanentone' },
			]}
		/>
	))
	.add('SoundCloud then Youtube', () => (
		<MyPlayList
			playlist={[
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/iamdogibson/permanentone' },
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
			]}
		/>
	))
	.add('empty', () => (
		<div></div>
	));
