import { addContact, deletingContact, fetchingContacts, updatingContact } from '../../store/reducers/contact'
import LoadingComponent from '../../components/loading'
import ModalComponent from '../../components/modal'
import ContactFormComponent from '../../components/contact-form'
import './style.css'
import AddUserIcon from '../../aseets/user.png'
import { getRandomColor } from '../../helper'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [contactDetail, setContactDetail] = useState({
        id: null
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const contacts = useSelector((state) => state.contact.contacts)
    const contactsLoad = useSelector((state) => state.contact.loading)
    const contactAlert = useSelector((state) => state.contact.alert)

    useEffect(() => {
        dispatch(fetchingContacts())
    }, [])

    useEffect(() => {
        if (contactAlert?.showAlert) {
            Swal.fire(contactAlert);
        }
    }, [contactAlert])

    const ProfileImage = ({ src, alt, placeholder }) => {
        const [imgError, setImgError] = useState(false);
      
        return imgError || src === 'N/A' ? (
          <div className="default-profile" style={{ backgroundColor: getRandomColor().backgroundColor }}>
            <p style={{ color: getRandomColor().color }}>{placeholder.toUpperCase()}</p>
          </div>
        ) : (
          <img src={src} alt={alt} onError={() => setImgError(true)} />
        );
    };  

    const getDetail = (contact) => () => {
        navigate(`contact/${contact.id}`)
    }

    const deleteContact = (contactId) => () => {
        setContactDetail({ id:contactId })

        Swal.fire({
            title: "Do you want to delete the contact?",
            showCancelButton: true,
            confirmButtonText: "yes",
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletingContact(contactId))
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }

            setContactDetail({ id:null })
          });
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setContactDetail({ id:null })
    };

    const handleAddContact = (newContact) => {
        dispatch(addContact(newContact))
        handleCloseModal()
        setContactDetail({ id:null })
    };

    const handleUpdateContact = (newContact) => {
        dispatch(updatingContact(newContact))
        handleCloseModal()
        setContactDetail({ id:0 })
    };

    const updateContact = (contact) => () => {
        setContactDetail(contact)
        handleOpenModal()
    }

    if (contactsLoad) {
        return <LoadingComponent/>
    }

    return (
        <div className='home'>
            <div className='container'>
                <div className='header'>
                    <div>
                        <h1 className='title'>Contacts</h1>
                        <h3 className='desc'>Find your contact here</h3>
                    </div>
                    <div>
                        <button className='btn-add' onClick={handleOpenModal}>
                            <img src={AddUserIcon} height='20' alt='user plus' />
                            Create Contact
                        </button>
                    </div>
                </div>
                
                <div className='divider'></div>
                <br/>
                {contacts?.map((contact) => (
                    <div className={`contact-card ${contactDetail?.id === contact.id ? 'active' : '' }`} key={contact.id}>
                        <div onClick={getDetail(contact)} className='contact-photo'>
                            <ProfileImage src={contact.photo} alt={contact.firstName} placeholder={contact.firstName.slice(0, 2)} />
                        </div>
                        <div onClick={getDetail(contact)} className='contact-information'>
                            <p className='contact-name'>{contact.firstName} {contact.lastName}</p>
                            <p className='contact-age'>Age: {contact.age}</p>
                            <p className='contact-sosmed'>Instagram</p>

                        </div>
                        <div className='contact-action'>
                            <div className='btn-delete' onClick={deleteContact(contact.id)}>Delete</div>
                            <div className='btn-update' onClick={updateContact(contact)}>Update</div>
                        </div>
                    </div>
                ))}
            </div>
            <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>
                <ContactFormComponent
                    onSubmit={handleAddContact}
                    onSubmitUpdate={handleUpdateContact}
                    onClose={handleCloseModal} 
                    contact={contactDetail}
                />
            </ModalComponent>
        </div>
    )
}
