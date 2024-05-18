import ContactService from '../../services/contact';
import { setContacts, setContact, setContactError, setContactLoad, setContactAlert } from '../actions/contact'

const initialState = {
	contacts: [],
	contact: {},
    error: {},
    loading: false,
    alert: {
        title: "",
        text: "",
        icon: "",
        showAlert: false
    },
};

export default function contactReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_CONTACTS':
			return { ...state, contacts: action.payload };
		case 'SET_CONTACT':
			return { ...state, contact: action.payload };
		case 'SET_CONTACT_ERROR':
			return { ...state, error: action.payload };
		case 'SET_CONTACT_LOAD':
			return { ...state, loading: action.payload };
		case 'SET_CONTACT_ALERT':
			return { ...state, alert: { ...state.alert, ...action.payload } };
		default:
			return state;
	}
}

const contactService = new ContactService();

export function fetchingContacts() {

	return async (dispatch) => {
		dispatch(setContactLoad(true));
		try {
			const getData = await contactService.getContacts()

			if (getData.data) {
				dispatch(setContacts(getData.data));
				dispatch(setContactLoad(false));
			} else {
                throw getData
            }
		} catch (error) {
			dispatch(setContactLoad(false));
		}
	};
}

export function fetchingContact(contactId) {

	return async (dispatch) => {
		dispatch(setContactLoad(true));
		try {
			const getData = await contactService.getContact(contactId)

			if (getData.data) {
				dispatch(setContact(getData.data));
				dispatch(setContactLoad(false));
			} else {
                throw getData
            }
		} catch (error) {
			dispatch(setContactLoad(false));
		}
	};
}

export function addContact(payload) {

	return async (dispatch) => {
		dispatch(setContactLoad(true));
		try {
			const getData = await contactService.addContact(payload)

			if (getData.message === 'Success!') {
                const alertPayload = {
                    title: 'Success',
                    text: 'add contact',
                    icon: 'success',
                    showAlert: true
                }
                dispatch(setContactAlert(alertPayload))
				dispatch(fetchingContacts());
				dispatch(setContactLoad(false));
			} else {
                throw getData
            }
		} catch (error) {
            const alertPayload = {
                title: 'Oops',
                text: 'something wrong',
                icon: 'info',
                showAlert: true
            }
            dispatch(setContactAlert(alertPayload))
			dispatch(setContactLoad(false));
		}

        setTimeout(() => {
            dispatch(setContactAlert({showAlert: false}))
        }, 3000)
	};
}

export function updatingContact(payload) {

	return async (dispatch) => {
		dispatch(setContactLoad(true));
		try {
			const getData = await contactService.updateContact(payload)

			if (getData.message === 'Success!') {
                const alertPayload = {
                    title: 'Success',
                    text: 'update contact',
                    icon: 'success',
                    showAlert: true
                }
                dispatch(setContactAlert(alertPayload))
				dispatch(fetchingContacts());
				dispatch(setContactLoad(false));
			} else {
                throw getData
            }
		} catch (error) {
            const alertPayload = {
                title: 'Oops',
                text: 'something wrong',
                icon: 'info',
                showAlert: true
            }
            dispatch(setContactAlert(alertPayload))
			dispatch(setContactLoad(false));
		}

        setTimeout(() => {
            dispatch(setContactAlert({showAlert: false}))
        }, 3000)
	};
}

export function deletingContact(contactId) {

	return async (dispatch) => {
		dispatch(setContactLoad(true));
		try {
			const getData = await contactService.delteContact(contactId)

			if (getData.data) {
                const alertPayload = {
                    title: 'Success',
                    text: 'delete contact',
                    icon: 'success',
                    showAlert: true
                }
                dispatch(setContactAlert(alertPayload))
				dispatch(fetchingContacts());
				dispatch(setContactLoad(false));
			} else {
                throw getData
            }
		} catch (error) {
            const alertPayload = {
                title: 'Oops',
                text: 'something wrong',
                icon: 'info',
                showAlert: true
            }
            dispatch(setContactAlert(alertPayload))
			dispatch(setContactLoad(false));
		}

        setTimeout(() => {
            dispatch(setContactAlert({showAlert: false}))
        }, 3000)
	};
}
