import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs'

const NotePage = () => {
	let { id } = useParams();
	// console.log("Parameters: ", id)
	const navigate = useNavigate();

	let [note, setNote] = useState(null);

	useEffect(() => {
		getNote()
	}, [id]);

	let getNote = async () => {
		if (id === 'new') return
		let res = await fetch(`/api/notes/${id}/`);
		let data = await res.json()
		setNote(data);
	};

	let createNote = async () => {
		fetch(`/api/notes/create/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
	};

	let updateNote = async () => {
		fetch(`/api/notes/${id}/update/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
	};

	let deleteNote = async () => {
		fetch(`/api/notes/${id}/delete/`, {
			method: 'DELETE',
			'headers': {
				'Content-Type': 'application/json'
			},
		})
		navigate('/');
	};

	let handleSubmit = () => {
		if (id !== 'new' && !note.body) {
			deleteNote();
		} else if (id !== 'new') {
			updateNote();
		} else if (id === 'new' && note.body !== null) {
			createNote();
		}
		navigate('/');
	};

	return (
		<div className='note'>
			<div className='note-header'>
				<h3>
					<BsBoxArrowLeft onClick={handleSubmit} />
				</h3>
				{id !== 'new' ? (
					<button onClick={deleteNote}>X</button>
				) : (
					<button onClick={handleSubmit}>Submit</button>
				)}
			</div>
			<textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
		</div>
	)
};

export default NotePage;