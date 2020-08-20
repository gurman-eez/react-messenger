import React, {Component} from 'react';

import './post-status-filter.css';

export default class PostStatusFilter extends Component {

	buttons = [								// создаем массив кнопок
		{name: 'all', label: 'All'},
		{name: 'like', label: 'Liked'}
	]


	render() {
		const buttons = this.buttons.map(({name, label}) => {
			const {filter, onFilterSelect} = this.props;		// достаем пропсы

			const active = filter === name;			// проверка на совпадение фильтра
			const clasS = active ? 'btn-info' : 'btn-outline-secondary'		// добавление соответствующего класса

			return (
				<button
					key={name}
					type='button'
					className={`btn ${clasS}`}
					onClick={() => onFilterSelect(name)}>{label}</button>
			)
		})

		return (
			<div className='btn-group'>
				{buttons}
			</div>
		)
	}
}
