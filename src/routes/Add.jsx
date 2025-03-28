import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import db from '../utils/db.js';

export const Add = () => {

    const navigate = useNavigate();
    const [contact, setContact] = useState({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        })

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const c = collection(db, 'contacts');
        addDoc(c, contact)
        .then(() => navigate('/'))
    }

    return (
        <div>
            <div className="nav d-flex justify-content-between">
                <Link className="btn btn-secondary" to="/">Return to List</Link>
                <Link className="btn btn-secondary" to="/add">{'\u002B'}</Link>
            </div>

            <div className="form-container">
                <h1>Add Contact</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstName" onChange={handleChange} value={contact.firstName} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastName" onChange={handleChange} value={contact.lastName} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="string" className="form-control" name="phoneNumber" onChange={handleChange} value={contact.phoneNumber} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" name="email" onChange={handleChange} value={contact.email} />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/" className="btn btn-secondary me-2">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>

        </div>
    )
}