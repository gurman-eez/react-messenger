import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import PostAddForm from '../post-add-form';

import './app.css';

const App = () => {

	const data = [
		{label: 'Gonna learn React...', important: false, like: false, id: 1},
		{label: 'I thougth that will be way easyier..', important: false, like: false, id: 2},
		{label: 'Shit!', important: false, like: false, id: 3},
	]

	const newData = data.filter(el => {
		if (el.label) {
			return el;
		} 
		return null;
	});

	
	return (
		<div className='app'>
			<AppHeader/>
			<div className='search-panel d-flex'>
				<SearchPanel/>
				<PostStatusFilter/>
			</div>
			<PostList posts={newData}/>
			<PostAddForm/>
		</div>
	)
}

export default App;