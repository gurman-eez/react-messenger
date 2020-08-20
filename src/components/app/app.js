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
			{ label: 'Gonna learn React...', important: false, like: false, id: nextId() },
			{ label: 'I thougth that will be way easyier..', important: false, like: false, id: nextId() },
			{ label: 'Shit!', important: false, like: false, id: nextId() },
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

	onToggleImportant = (id) => {
		this.setState(({ data }) => {
			const index = data.findIndex(elem => elem.id === id);
			const old = data[index];
			const newItem = { ...old, important: !old.important };
			const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
			return {
				data: newArr
			}
		})
	}

	onToggleLiked = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);
			const old = data[index];
			const newItem = {...old, like: !old.like};
			const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
			return {
				data: newArr
			}
		})
	}


	render() {
		const {data} = this.state

		const liked = data.filter(elem => elem.like).length;
		const allPosts = data.length;

		const newData = data.filter(el => {
			if (el.label) {
				return el;
			}
			return null;
		});

		return (
			<div className='app'>
				<AppHeader
				liked={liked}
				allPosts={allPosts} />
				<div className='search-panel d-flex'>
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList 
				posts={newData}
				onDelete={this.deleteItem}
				onToggleImportant={this.onToggleImportant}
				onToggleLiked={this.onToggleLiked} />
				<PostAddForm 
				onAdd={this.onAdd} />
			</div>
		)
	}

	

	

	
	
}
