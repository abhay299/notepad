import React, { useEffect, useState } from 'react'
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {

	const [notes, setNotes] = useState([]);

	useEffect(() => {
		getNotes()
	}, []);

	let getNotes = async () => {
		let res = await fetch('/api/notes/');
		let data = await res.json();
		// console.log('DATA: ', data);
		setNotes(data);
	}

	return (
		<div>
			<div className='notesList'>
				{notes.map((note) => (
					<ListItem key={note.id} note={note} />
				))}
			</div>
			<AddButton />
		</div>
	)
}

export default NotesListPage;