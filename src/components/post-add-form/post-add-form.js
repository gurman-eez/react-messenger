import React, {Component} from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {

	state = {									// задаем содержимое input в стейт
		text: ''
	}

	onValueChange = (e) => {				// отслеживаем изменения в input
		this.setState({
			text:e.target.value
		})
	}

	onSubmit = (e) => {							// отправка поста
		e.preventDefault();						// отключение базовых действий кнопки
		this.props.onAdd(this.state.text)	// добавляем пост
		this.setState({							// очищаем input после отправки
			text: ''
		})
	}

	render() {
		return (
			<form className='bottom-panel d-flex'
			onSubmit={this.onSubmit}>
				<input
					type='text'
					placeholder='What are you thinking about?'
					className='form-control new-post-label'
					onChange={this.onValueChange}
					value={this.state.text} />
				<button
					type='submit'
					className='btn btn-outline-secondary'>Add</button>
			</form>
		)
	}
}
