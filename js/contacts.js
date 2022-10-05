
let contacts = []; 



async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadContacts();
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


    // let contact =
    //     {
    //         'name': name.value,
    //         'email': email.value,
    //         'phone': phone.value,
    //     };
    //     contact.push(contacts)
    //     console.log(contacts);


    //    saveContacts();
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


// function saveContacts() {
//     backend.setItem('contacts', JSON.stringify(contacts));
    
// }



// Function shows Contact Book with Contacts //

function showContacts() {
  document.getElementById('contact-book').innerHTML = ``;

  for (let i = 0; i < contacts.length; i++) {
    document.getElementById('contact-book').innerHTML += `


        <div class="content-left"
            <div class="contact-box">
            
                <div>
                    <img class="contact-img" src="/assets/img/profile-dummy.png" alt="">
                </div>
                
                <div class="contact-info">
                    <span>${contacts['name']}</span>
                    <a href="email">${contacts['phone']}</a>
                </div>         
            </div> 
        </div>    
    `;
    
  }

}

function openNewContact() { 
    document.getElementById('contact-overlay').classList.remove('d-none');
}

function closeNewContact(){
    document.getElementById('contact-overlay').classList.add('d-none');
}



