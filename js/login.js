let users = [];
let guests = [];
let signUpDone = false;
let userNoFound = true;
/**
 * This function load the users from the server at the beginning and save it in the users-array
 */
async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever') ;
    await downloadFromServer();
    await loadUser();
   
}

async function loadUser(){
    users = await JSON.parse(backend.getItem('users')) || [];
    guests = await JSON.parse(backend.getItem('guests')) || [];    
}

/**
 * This function check the Log In data of the user
 */

function loginUser(){
    let userMail= document.getElementById('inputEmail-child');
    let userPassword= document.getElementById('inputPassword-child');
    /* console.log(userMail);
    console.log(userPassword); */
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.Mail == userMail.value && element.Password == userPassword.value){
            userNoFound = false;
            window.open('./assets/templates/desktop_template.html', "_self");
            generateMessageLogIn(userNoFound); 
        }     
    }
    if(userNoFound){
        generateMessageLogIn(userNoFound);   
    }
    userMail.value ='';
    userPassword.value ='';
}

function guest(){
    window.open('./assets/templates/desktop_template.html');
}

/**
 * This function add a user to the server
 */

async function addUser() {
    let userName= document.getElementById('inputName-child-su');
    let userMail= document.getElementById('inputEmail-child-su');
    let userPassword= document.getElementById('inputPassword-child-su');
    let user = {
        "Name": userName.value, 
        "Mail": userMail.value, 
        "Password": userPassword.value 
    };
    users.push(user);
    await backend.setItem('users', JSON.stringify(users));
    users.push(user);
    signUpDone = true;  
    generateMessage(signUpDone);
    userName.value ='';
    userMail.value ='';
    userPassword.value ='';
    
}

/**
 * This function delete a user from the server
 */
async function deleteUser(name) {
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(element.Name == 'name'){
            await backend.deleteItem('users[i]');
            /* break; */
        }     
    }   
}

/**
 * This function generate a message after the user have been registrated
 * @param {boolean} actionDone - this give up the confirmation for Sign up or Log in
 */
function generateMessage(actionDone){
    
    if(actionDone){
        document.getElementById('msgBox').innerHTML = `<span>Registration successfull go back to log in</span>`;
    }else{
        document.getElementById('msgBox').innerHTML  = `<span>Registration not successfull</span>`;
    }
}

/**
 * This function generate a message after the user have been logged in
 */
function generateMessageLogIn(actionDone){   
    if(actionDone){       
        document.getElementById('msgBoxLogIn').innerHTML = `<span>Log In not successfull: Mail or Password not correct!</span>`;
    }else{
        document.getElementById('msgBoxLogIn').innerHTML  = `<span>Log In successfull</span>`;
    }
}