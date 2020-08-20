import React from 'react';
import PostListItem from '../post-list-item';

import './post-list.css';

const PostList = ({posts, onDelete, onToggle}) => {			// выводим пропсы

	
	const elements = posts.map(elem => {					// создаем отдельный пост

		const {id, ...otherProps} = elem;					// дробление на ключи

		return (
			<li key={id} className='list-group-item'>
				<PostListItem
				{...otherProps}
				onDelete={() => onDelete(id)}
				onToggleImportant={() => onToggle(id, 1)}
				onToggleLiked={() => onToggle(id)} />
			</li>
		)
	});

	return (
		<ul className='app-list list-group'>
			{elements}
		</ul>
	)
}

export default PostList;