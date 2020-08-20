import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

	state = {
		term: ''
	}

	onUpdateSearch = (e) => {
		const term = e.target.value;
		this.setState({term});
		this.props.onUpdateSearch(term);
	}

	render() {
		return (
			<input
				className='form-conrol search-input'
				type='text'
				placeholder='Search post'
				onChange={this.onUpdateSearch} />
		)
	}
}
