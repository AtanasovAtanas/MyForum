import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../modal";

const Actions = ({ articleId, title, handler }) => {
	const editLink = `/articles/edit/${articleId}`;

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	const location = useLocation();

	const cancelHandler = () => {
		toggleModal();
	};

	return (
		<React.Fragment>
			<FontAwesome icon={faEdit} />
			<Link to={editLink}>Edit</Link>
			<FontAwesome icon={faTrash} />
			<Link
				to={`${location.pathname}${location.search}`}
				onClick={() => toggleModal()}
			>
				Delete
			</Link>
			<DeleteModal
				show={isOpen}
				title="WARNING"
				text={`Are you sure you want to delete ${title}?`}
				actionButtonText="Delete"
				actionHandler={() => {
					handler();
					toggleModal();
				}}
				cancelHandler={cancelHandler}
			/>
		</React.Fragment>
	);
};

export default Actions;
