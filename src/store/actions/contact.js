export function setContacts(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_CONTACTS',
			payload
		});
	};
}

export function setContact(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_CONTACT',
			payload
		});
	};
}

export function setContactError(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_CONTACT_ERROR',
			payload
		});
	};
}

export function setContactLoad(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_CONTACT_LOAD',
			payload
		});
	};
}

export function setContactAlert(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_CONTACT_ALERT',
			payload
		});
	};
}
