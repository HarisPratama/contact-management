import env from '../env/index'

class ContactService {
    getContacts() {
        return new Promise((resolve, reject) => {
            fetch(env.API_URL)
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getContact(contactId) {
        return new Promise((resolve, reject) => {
            fetch(`${env.API_URL}/${contactId}`)
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    addContact(payload) {
        return new Promise((resolve, reject) => {
            fetch(env.API_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    updateContact(payload) {
        return new Promise((resolve, reject) => {
            const updatedPayload = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                age: payload.age,
                photo: payload.photo,
            }
            fetch(`${env.API_URL}/${payload.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedPayload)
            })
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    delteContact(contactId) {
        return new Promise((resolve, reject) => {
            fetch(`${env.API_URL}/${contactId}`, {
                method: 'DELETE'
            })
                .then((res) => res.json())
                .then((resp) => {
                    resolve(resp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

export default ContactService