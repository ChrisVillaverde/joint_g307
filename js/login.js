let users = [];
/* let users=[
    {
        "Name": "Russell", 
        "Mail": "test@gmail.com", 
        "Password": "test1234" 
    }
]; */

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function loginUser(){
    let userMail= document.getElementById('inputEmail-child');
    let userPassword= document.getElementById('inputPassword-child');
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.Mail == userMail.value && element.Password == userPassword.value){
            window.open('./assets/templates/desktop_template.html');
        }else{
            alert('Log in war NICHT erfolgreich...')
        }       
    }
    userMail.value ='';
    userPassword.value ='';
}

function guest(){
    window.open('./assets/templates/desktop_template.html');
}

async function addUser() {
    let userName= document.getElementById('inputName-child-su');
    let userMail= document.getElementById('inputEmail-child-su');
    let userPassword= document.getElementById('inputPassword-child-su');

    let User = {
        "Name": userName.value, 
        "Mail": userMail.value, 
        "Password": userPassword.value 
    };
    users.push(User);
    await backend.setItem('users', JSON.stringify(users));
    console.log(User)
    users.push(User);
    console.log(users)
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.Mail == userMail.value && element.Password == userPassword.value){
            generateMessage();
        }else{
            alert('Registrierung war NICHT erfolgreich...')
        }       
    }
    userName.value ='';
    userMail.value ='';
    userPassword.value ='';
    generateMessage();
}

/* function addUser(){
    let userName= document.getElementById('inputName-child-su');
    let userMail= document.getElementById('inputEmail-child-su');
    let userPassword= document.getElementById('inputPassword-child-su');

    let User = {
        "Name": userName.value, 
        "Mail": userMail.value, 
        "Password": userPassword.value 
    };
    console.log(User)
    users.push(User);
    console.log(users)
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.Mail == userMail.value && element.Password == userPassword.value){
            generateMessage();
        }else{
            alert('Registrierung war NICHT erfolgreich...')
        }       
    }
    userName.value ='';
    userMail.value ='';
    userPassword.value ='';
    generateMessage();

} */

function generateMessage(){
    const msg = window.location.search;
    
    console.log(msg)
    if(msg){
        document.getElementById('msgBox').innerHTML = `<span>Registrierung erfolgreich</span>`;
    }else{
        document.getElementById('msgBox').innerHTML  = ``;
    }
}