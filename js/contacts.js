let contacts = []; 
let color;


async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadContacts();
    await showContacts();
    // await deleteUser();  
}

// async function deleteUser(contacts) {
//     await backend.deleteItem('contacts');
//   }


async function loadContacts() {
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
}

async function newContact() {
    let name = document.getElementById('newContact-name');
    let email = document.getElementById('newContact-email');
    let phone = document.getElementById('newContact-phone');
    color = Math.floor(Math.random()*16777215).toString(16);
    addNewContactToArray(name, email, phone, color);
    showContacts();
}


async function addNewContactToArray(name, email, phone, color) {
    let contact = { fullname: name.value, mail: email.value, phone: phone.value, color: color };
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

    let letter;
    let letter2;

  document.getElementById('contact-book').innerHTML = ``;

  contacts.sort(function (a, b) {
    if (a.fullname < b.fullname){
        return -1;
    }

    if (a.fullname > b.fullname) {
        return 1;
    }

    return 0;
});

    for (let i = 0; i < contacts.length; i++){

        letter=contacts[i].fullname.slice(0,1);

            if(i!=contacts.length-1){
                letter2=contacts[i+1].fullname.slice(0,1);
            }

            if (i==0){
                document.getElementById('contact-book').innerHTML += `<div class="letter">${letter} <br></div> <div class="letter-child"></div> `;
            }

        document.getElementById('contact-book').innerHTML += await renderContactTemplate(i);


            if( (letter!=letter2)  ){

                document.getElementById('contact-book').innerHTML += `<div class="letter">${letter2} <br></div><div class="letter-child"></div> `;
            }

    }

}


function showDetailsContact(i){
    const indexSpace = contacts[i].fullname.indexOf(' ') ; 
    const ShortName = contacts[i].fullname.charAt(0) + contacts[i].fullname.charAt(indexSpace+1);
    document.getElementById('contactOverview').innerHTML= 
    

    `<div class="contact-card">
        <div class="contact-header">
            <div style="background: #${contacts[i].color}" class="contact-short-name">
                ${ShortName.toUpperCase()}
            </div>
            <div class="contact-header-child">
                <div class="contact-name">${contacts[i].fullname}</div>
                <div class="add-task">
                    <img src="./assets/img/edit_stift.png" alt="">
                    <a href="">  Add Task</a>
                </div>
            </div>
        </div>
        <div>
            <div class="contact-headline">Contact Information</div>
        </div>
        <div>
            <div class="contact-email">E Mail</div>
            <a href="mailto:${contacts[i].mail}">${contacts[i].mail}</a>
            <div class="contact-phone">Mobil</div>
            <div class"phone-number">${contacts[i].phone}</div>
        </div>

        <div class="btn-flex">
            <button class="button-contact" onclick="openNewContact()" >New contact <img  class="capa" src="/assets/img/Capa.png" alt=""></button>
        </div>
    </div>
    
    
    
    
    `;
    
}

async function renderContactTemplate(i){
 const indexSpace = contacts[i].fullname.indexOf(' ') ; 
 const ShortName = contacts[i].fullname.charAt(0) + contacts[i].fullname.charAt(indexSpace+1); 

    return `   <div class="content-left" onclick="showDetailsContact(${i})">
    <div class="contact-box">

    <div style="background: #${contacts[i].color}" class="short-name">
    ${ShortName.toUpperCase()}
    </div>

        <div class="contact-info">
            <span>${contacts[i].fullname}</span>

            <a href="mailto:${contacts[i].mail}">${contacts[i].mail}</a>
        </div>        
    </div> 
    </div> 
    `;

}

function openNewContact() { 
    document.getElementById('contact-overlay').classList.remove('d-none');
    document.getElementById("contact-overlay-body").style.opacity = "0.5";

}

function closeNewContact(){
    document.getElementById('contact-overlay').classList.add('d-none');
    document.getElementById("contact-overlay-body").style.opacity = "1";
    
}



