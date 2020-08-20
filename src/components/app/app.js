import React, {Component} from 'react';
import nextId from "react-id-generator";		// генератор id

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component{

	state = {
		data : [				// База данных постов
			{ label: 'Gonna learn React...', important: false, like: false, id: nextId() },
			{ label: 'I thougth that will be way easyier..', important: false, like: false, id: nextId() },
			{ label: 'Shit!', important: false, like: false, id: nextId() },
		],
		term: '',			// поиск
		filter: 'all'		// класс кнопки  по умолчанию
	}

	deleteItem = (id) => {		// удаление поста
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);						// находим пост по индексу
			const newArr = [...data.slice(0, index), ...data.slice(index + 1)]	// создаем новый массив без удаленного поста
			return {
				data: newArr		// обновляем массив в state
			}
		})
	}

	onAdd = (body) => {				// добавление поста
		if (body.length !== 0) {	// проверка на наличие символов в input
			const newItem = {
				label: body,
				important: false,
				id: nextId()
			}

			this.setState(({ data }) => {
				const newArr = [...data, newItem];	// создаем новый массив с добавлением поста
				return {
					data: newArr							// обновляем массив в state
				}
			})
		}
	}

	onToggle = (id, i = 0) => {				// переключение поста на important и like
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);		// находим пост по индексу
			const old = data[index];						// выделяем пост
			const newItem = i === 1 ? { ...old, important: !old.important } : { ...old, like: !old.like };		// тогглим выбранный класс 
			const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]	// создаем новый массив
			return {
				data: newArr							// обновляем массив в state
			}
		})
	}

	searchPosts = (items, term) => {					// поиск постов
		if (term.length === 0) return items;
		return items.filter(item => item.label.toUpperCase().indexOf(term.toUpperCase()) > -1)		// возвращаем совпадения
	}

	filterPosts = (items, filter) => {		// фильтр постов
		if (filter === 'like') {
			return items.filter(item => item.like)		// возвращаем лайкнутые посты
		}
		return items
	}

	onUpdateSearch = (term) => {
		this.setState({term})
	}

	onFilterSelect = (filter) => {
		this.setState({filter})
	}


	render() {
		const {data,term, filter} = this.state						// достаем переменные из state

		const liked = data.filter(elem => elem.like).length;		// количество лайкнутых постов
		const allPosts = data.length;										// количество всех постов

		const newData = data.filter(el => {	// фильтруем базу данных постов на наличие label
			if (el.label) {
				return el;
			}
			return null;
		});

		const visiblePosts = this.filterPosts(this.searchPosts(newData, term), filter);	//показываем посты после поиска и фильтра

		return (
			<div className='app'>
				<AppHeader
					liked={liked}											// задаем пропсы на компоненты
					allPosts={allPosts} />
				<div className='search-panel d-flex'>
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch} />
					<PostStatusFilter 
						filter={filter}
						onFilterSelect={this.onFilterSelect} />
				</div>
				<PostList 
					posts={visiblePosts}
					onDelete={this.deleteItem}
					onToggle={this.onToggle}
					 />
				<PostAddForm 
					onAdd={this.onAdd} />
			</div>
		)
	}

	

	

	
	
}
