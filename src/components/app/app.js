import React, {Component} from 'react';
import nextId from "react-id-generator";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component{

	state = {
		data : [
			{ label: 'Gonna learn React...', important: false, id: nextId() },
			{ label: 'I thougth that will be way easyier..', important: false, id: nextId() },
			{ label: 'Shit!', important: false, id: nextId() },
		]
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);
			const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
			return {
				data: newArr
			}
		})
	}

	onAdd = (body) => {
		const newItem = {
			label: body,
			important: false,
			id: nextId()
		}

		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		})
	}


	render() {

		const {data} = this.state

		const newData = data.filter(el => {
			if (el.label) {
				return el;
			}
			return null;
		});

		return (
			<div className='app'>
				<AppHeader />
				<div className='search-panel d-flex'>
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList 
				posts={newData}
				onDelete={this.deleteItem} />
				<PostAddForm 
				onAdd={this.onAdd} />
			</div>
		)
	}

	

	

	
	
}
