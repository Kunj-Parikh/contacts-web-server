import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import AddContact from './AddContact';




const App = () => {
  return (
    <div>
      <ContactList />
      <AddContact />
    </div>
  )
}

function ContactList() {
  const [contacts, setContacts] = useState(null);

  

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts');
      const json = await response.json();

      if(response.ok) setContacts(json);
    }

    fetchContacts();

  }, [])

  const handleDelete = async (contactId) => {
    const response = await fetch(`/api/contacts/${contactId}`, {method: 'DELETE'});
  
    if(response.status === 204) {
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    }
    else console.log('Could not delete contact');
  }


  return (
    <div>
      <div className="contacts">
        <h1>Contacts</h1>
        <table>
          <tr>
            <th>Contact ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
          {contacts && contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td key={contact.id}>
                <button 
                  className='del' 
                  onClick={() => handleDelete(contact.id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App