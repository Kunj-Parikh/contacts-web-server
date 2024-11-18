import { useState } from 'react'
const AddContact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [err, setErr] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();

        const contact = {name, email}
        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) {
            setErr(json.err);
            console.log(json);
        }
        if(response.ok) {
            setName('');
            setEmail('');
            setErr(null);
            console.log("Contact added successfully", json);
        }
    }
    return (
        <form className="createContact" onSubmit={handleAdd}>
            <h3>Add a new contact</h3>

            <label>Contact name: </label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Contact email: </label>
            <input 
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <button>Add Contact</button>
            {err && <div className="err">{err}</div>}
        </form>
    )
}

export default AddContact