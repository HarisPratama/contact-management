import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import './style.css';
import { fetchingContact } from '../../store/reducers/contact';
import LoadingComponent from '../../components/loading';
import { getRandomColor } from '../../helper';
import Instagram from '../../aseets/instagram.png'
import Whatsapp from '../../aseets/whatsapp.png'
import Twitter from '../../aseets/twitter.png'
import Youtube from '../../aseets/youtube.png'

export default function DetailContact() {
    const params = useParams();

    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.contact)
    const contactsLoad = useSelector((state) => state.contact.loading)

    const [contactId, setContactId] = useState(null)

    useEffect(() => {
       setContactId(params.id)
       return () => {
        setContactId(null)
       }
    }, [params.id])

    useEffect(() => {
        if (contactId) {
            dispatch(fetchingContact(contactId))
        }
    }, [contactId])

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

    if (contactsLoad) {
        return <LoadingComponent/>
    }

    return (
        <div className='container-detail-contact'>
            <div className='contact-detail-photo'>
                <ProfileImage src={contact.photo} alt={contact.firstName} placeholder={contact.firstName?.slice(0, 2)} />
            </div>
            <h1>{`${contact?.firstName} ${contact?.lastName}`}</h1>
            <div className='contact-detail-socmed'>
                <img className='contact-detail-socmed-item' src={Instagram} alt='Instagram' />
                <img className='contact-detail-socmed-item' src={Whatsapp} alt='Whatsapp' />
                <img className='contact-detail-socmed-item' src={Twitter} alt='Twitter' />
                <img className='contact-detail-socmed-item' src={Youtube} alt='Youtube' />
            </div>
            <div className='contact-detail-back'>
                <Link to={'/'}>Back</Link>
            </div>
        </div>
    )
}
