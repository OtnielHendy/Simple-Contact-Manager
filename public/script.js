let editingContactId = null;

function setupInputValidation() {
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
    });

    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
    });
}

async function fetchContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    const contactsDiv = document.getElementById('contacts');

    contactsDiv.innerHTML = '';
    contacts.forEach(contact => renderContact(contact, contactsDiv));
}

function renderContact(contact, container) {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    contactDiv.id = `contact-${contact._id}`;
    contactDiv.innerHTML = `
        <span><strong>${contact.name}</strong> (${contact.email}, ${contact.phone})</span>
        <div>
            <button onclick="editContact('${contact._id}', '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
            <button onclick="deleteContact('${contact._id}')">Delete</button>
        </div>
    `;
    container.appendChild(contactDiv);
}

async function handleContact(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!validateInputs(name, phone)) {
        alert('Invalid input! Make sure the name contains only letters and the phone contains only numbers.');
        return;
    }

    const method = editingContactId ? 'PUT' : 'POST';
    const endpoint = editingContactId ? `/api/contacts/${editingContactId}` : '/api/contacts';

    const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
    });

    if (response.ok) {
        const updatedContact = await response.json();

        if (editingContactId) {
            updateContactInDOM(updatedContact);
        } else {
            const contactsDiv = document.getElementById('contacts');
            renderContact(updatedContact, contactsDiv);
        }

        resetForm();
    }
}

function validateInputs(name, phone) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]+$/;
    return nameRegex.test(name) && phoneRegex.test(phone);
}

function updateContactInDOM(contact) {
    const contactDiv = document.getElementById(`contact-${contact._id}`);
    if (contactDiv) {
        contactDiv.innerHTML = `
            <span><strong>${contact.name}</strong> (${contact.email}, ${contact.phone})</span>
            <div>
                <button onclick="editContact('${contact._id}', '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
                <button onclick="deleteContact('${contact._id}')">Delete</button>
            </div>
        `;
    }
}

function editContact(id, name, email, phone) {
    editingContactId = id;

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    document.getElementById('submitButton').textContent = 'Update Contact';
}

function resetForm() {
    editingContactId = null;

    document.getElementById('contactForm').reset();
    document.getElementById('submitButton').textContent = 'Add Contact';
}

async function deleteContact(id) {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const contactDiv = document.getElementById(`contact-${id}`);
        if (contactDiv) {
            contactDiv.remove();
        }
    }
}

document.getElementById('contactForm').addEventListener('submit', handleContact);
setupInputValidation();
fetchContacts();
