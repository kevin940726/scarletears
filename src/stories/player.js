import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player, { DefaultTheme } from '../components/Player';
import CustomTheme from '../components/DefaultTheme';
import PlayList from '../components/PlayList';

import demo1 from '../assets/LetsParty.mp3';
import demo2 from '../assets/Time&Space.mp3';

const MyPlayer = Player(DefaultTheme);
const Scarlet = Player(CustomTheme);

const MyPlayList = PlayList(MyPlayer);
const ScarletPlaylist = PlayList(Scarlet);

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
	.add('Youtube -> SoundCloud -> Youtube', () => (
		<MyPlayList
			playlist={[
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/iamdogibson/permanentone' },
				{ type: 'youtube', trackUrl: 'FVpG-RtZFE0' },
			]}
		/>
	))
	.add('SoundCloud -> Youtube -> SoundCloud', () => (
		<MyPlayList
			playlist={[
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/anatu/bleach' },
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/iamdogibson/permanentone' },
			]}
		/>
	))
	.add('HTML5 from local', () => (
		<MyPlayer
			type="html5"
			trackUrl={demo1}
		/>
	))
	.add('HTML5 then HTML5', () => (
		<MyPlayList
			playlist={[
				{ type: 'html5', trackUrl: demo1 },
				{ type: 'html5', trackUrl: demo2 },
			]}
		/>
	))
	.add('Scarlet Player', () => (
		<ScarletPlaylist
			playlist={[
				{ type: 'html5', trackUrl: demo1 },
				{ type: 'youtube', trackUrl: '5FjWe31S_0g' },
				{ type: 'soundcloud', trackUrl: 'https://soundcloud.com/anatu/bleach' },
				{ type: 'html5', trackUrl: demo2 },
			]}
		/>
	))
	.add('empty', () => (
		<div></div>
	));
