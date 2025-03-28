import { useState, useEffect } from 'react';
import { Link , useNavigate, useParams} from 'react-router-dom';
import db from '../utils/db.js';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

export const Contact = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(
        {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        }
    );
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        
        getDoc(doc(db, 'contacts', params.id))
        .then(document => {
            setContact({
                firstName: document.data().firstName,
                lastName: document.data().lastName,
                phoneNumber: document.data().phoneNumber,
                email: document.data().email
            })
        })
    }, [])

    function clickHandler () {
        deleteDoc(doc(db, 'contacts', params.id))
          .then(() => navigate('/'));
      }

    function toggleEditMode() {
        setIsEditing(!isEditing);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    }

    function saveChanges() {
        updateDoc(doc(db, 'contacts', params.id), contact)
            .then(() => setIsEditing(false));
    }

    return (
    <div>

            <div className="nav d-flex justify-content-between">
                <Link className="btn btn-secondary" to="/">Return to List</Link>
                <Link className="btn btn-secondary" to="/add">{'\u002B'}</Link>
            </div>

        <div className="contact-details">
            {isEditing ? (
                <div className="edit-form">

                <div className="heading">
                    <h1>Edit Contact</h1>
                </div>

                    <input
                        type="text"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={contact.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                    />
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <button className="btn btn-primary" onClick={saveChanges}>Save</button>
                </div>
            ) : (
                <div className="info">
            <div className="heading">
                <h1>{contact.firstName} {contact.lastName}</h1>
            </div>
                    <p><span className="label">Phone Number:</span> <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a></p>
                    <p><span className="label">Email:</span> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                </div>
            )}
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-warning" onClick={toggleEditMode}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button type="button" className="btn btn-danger" onClick={clickHandler}>Delete</button>
            </div>
            
        </div>


    </div>
    )
}