import React from 'react';
import PlayList from './PlayList';
import Player, { DefaultTheme } from './Player';

const MyPlayer = Player(DefaultTheme);

const Home = () => {
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
};

export default Home;
