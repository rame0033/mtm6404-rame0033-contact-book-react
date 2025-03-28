import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import db from '../utils/db.js';

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Added state for search term

    useEffect(() => {
        const c = collection(db, 'contacts');
        const q = query(c, orderBy('lastName'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => data.push({
                id: doc.id,
                ...doc.data()
            }));
            setContacts(data);
        });

        return () => unsubscribe(); // Added cleanup for onSnapshot
    }, []);

    const filteredContacts = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter contacts based on search term

    return (
        <div>
            <div className="control">
            <div className="nav d-flex justify-content-between">
                <h1>My Contacts</h1>
                <Link className="btn btn-secondary" to="/add">{'\u002B'}</Link>
            </div>

            <input
                type="text"
                className="form-control my-3"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            </div>

            <table className="table table-striped">
                <tbody>
                    {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td><Link to={`/contacts/${contact.id}`}> {contact.firstName} {contact.lastName}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};