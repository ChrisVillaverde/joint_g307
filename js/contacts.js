let contacts = [{
    'name': 'Anton Mayer',
    'Email': 'anton@gmail.com'
},
{
    'name': 'Anja Schulz',
    'Email': 'schulz@hotmail.com'
},
{
    'name': 'Benedikt Ziegler',
    'Email': 'benedikt@gmail.com'
},
{
    'name': 'David Eisenberg',
    'Email': 'davidberg@gmail.com'
},
{
    'name': 'Eva Fischer',
    'Email': 'eva@gmail.com'
},

{
    'name': 'Emmanuel Mauer',
    'Email': 'emmanuelMa@gmail.com'
},

{
    'name': 'Marcel Bauer',
    'Email': 'bauer@gmail.com'
},

{
    'name': 'Tatjana Wolf',
    'Email': 'wolf@gmail.com'
},];



// Function shows Contact Book with Contacts //

function showContacts() {
  document.getElementById('contact-book').innerHTML = ``;

  for (let i = 0; i < contacts.length; i++) {
    // const element = array[i];
    document.getElementById('contact-book').innerHTML += `


        <div class="content-left"
            <div class="contact-box">
            
                <div>
                    <img class="contact-img" src="/assets/img/profile-dummy.png" alt="">
                </div>
                
                <div class="contact-info">
                    <span>${contacts[i]['name']}</span>
                    <span>${contacts[i]['Email']}</span>
                </div>         
            </div> 
        </div>    
    `;
    
  }
}

function openNewContact() { 
    document.getElementById('contact-overlay').classList.remove('d-none');
}



