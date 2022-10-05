let contacts = []; 

async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadContacts();
    await showContacts();
    // contacts = JSON.parse(backend.getItem('contacts')) || [];
}


async function loadContacts() {
    contacts = await JSON.parse(backend.getItem('contacts')) || [];

}

async function newContact() {
    let name = document.getElementById('newContact-name');
    let email = document.getElementById('newContact-email');
    let phone = document.getElementById('newContact-phone');
    addNewContactToArray(name, email, phone)
}


async function addNewContactToArray(name, email, phone) {
    let contact = { fullname: name.value, mail: email.value, phone: phone.value };
    contacts.push(contact);
    await backend.setItem('contacts', JSON.stringify(contacts));
    clearNewContactInputfields(name, email, phone);
}

function clearNewContactInputfields(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}


// Function shows Contact Book with Contacts //

async function showContacts() {

  document.getElementById('contact-book').innerHTML = ``;

  for (let i = 0; i < contacts.length; i++) document.getElementById('contact-book').innerHTML += renderContactTemplate(i);

}


function renderContactTemplate(i){
    return `   <div class="content-left"
                    <div class="contact-box">
            
                    <div>
                        <img class="contact-img" src="/assets/img/profile-dummy.png" alt="">
                    </div>
                
                        <div class="contact-info">
                            <span>${contacts[i].fullname}</span>
                            <a href="email">${contacts[i].phone}</a>
                        </div>         
                    </div> 
                </div>    
    `;

}

function openNewContact() { 
    document.getElementById('contact-overlay').classList.remove('d-none');
}

function closeNewContact(){
    document.getElementById('contact-overlay').classList.add('d-none');
}



