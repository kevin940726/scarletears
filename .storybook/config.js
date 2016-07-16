/* eslint-disable global-require */
import { configure } from '@kadira/storybook';

function loadStories() {
	require('../src/stories/player');
}

configure(loadStories, module);
