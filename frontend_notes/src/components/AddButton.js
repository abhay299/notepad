import React from 'react';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';

const AddButton = () => {
	return (
		<Link to={"/note/new"}>
			<CgAdd />
		</Link>
	)
}

export default AddButton;