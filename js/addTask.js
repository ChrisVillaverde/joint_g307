let priority_button;
let tasks = [];
let openContact;
let openCategory;
let users = [];
let ids = [];
let day = "";
let contacts = [];
let selectNames=[];
let selectNamesWithoutSpace=[];

//

async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadTask();
    await loadContacts();
}

async function loadContacts() {
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
}

async function loadTask() {

    tasks = await backend.getItem('tasks') || [];

}
function showDateToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();


    day = dd + '/' + mm + '/' + yyyy;
    document.getElementById("dueDate").value = day;

}
function showDate() {
    day = document.getElementById("dueDate").value;
}






function taskAddedToBord() {


    document.getElementById('showCreateTask').classList.remove('d-none');



    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('downShowCreateTask');
    }, 2000)

    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('d-none');
        document.getElementById('showCreateTask').classList.remove('downShowCreateTask');
    }, 2300)



    resetForm();



}

function resetForm() {

    let form = document.getElementById('form');

    form.addEventListener('submit', function handleSubmit(event) {
        event.preventDefault();
        
        form.reset();
    });



}

async function addTask(status) {

    ids = tasks.map((number) => {
        return number.id
    })

    let onlyNumbers = ids.filter(
        element => typeof element === 'number'
    );


    let id = Math.max(...onlyNumbers) + 1;
    if (!id || id == -Infinity) {
        id = 1;
    }

    let title = document.getElementById('title');
    let selectContacts = [];
    
    for (let i=0;i<selectNames.length;i++){

        if (document.getElementById(selectNamesWithoutSpace[i]).checked) {

            selectContacts.push(document.getElementById(selectNamesWithoutSpace[i]).value);
        }
    }
  

 

    let category = document.getElementById('categoryNew');
    let description = document.getElementById('description');

    tasks.push(
        {
            'title': title.value,
            'selectContacts': selectContacts,
            'date': day,
            'category': category.value,
            'priority': priority_button,
            'description': description.value,
            'id': id,
            'state': status

        });

    await saveTask();

    taskAddedToBord();


}


async function saveTask() {
    await backend.setItem('tasks', tasks);
    let taskAsText = JSON.stringify(tasks);

}

function clickPriority(priority) {

    let button_prio_high = document.getElementById('button_prio_high');
    let button_prio_middle = document.getElementById('button_prio_middle');
    let button_prio_low = document.getElementById('button_prio_low');

    if (priority == "high") {

        settingsPriorityHigh();
    }

    if (priority == "middle") {

        settingsPriorityMiddle();
    }

    if (priority == "low") {

        settingsPriorityLow();
    }

}

function settingsDefault() {
    
    button_prio_high.style.background = 'white';
    button_prio_middle.style.background = 'white';
    button_prio_low.style.background = 'white';
    priority_button = ""; 
    selectNames=[];
    selectNamesWithoutSpace=[];
    showContact();

}


function settingsPriorityHigh() {

    button_prio_high.style.background = '#FF3D00';
    button_prio_middle.style.background = 'white';
    button_prio_low.style.background = 'white';
    priority_button = "high";
}

function settingsPriorityMiddle() {
    button_prio_high.style.background = 'white';
    button_prio_middle.style.background = '#FFA800';
    button_prio_low.style.background = 'white';
    priority_button = "middle";

}

function settingsPriorityLow() {
    button_prio_high.style.background = 'white';
    button_prio_middle.style.background = 'white';
    button_prio_low.style.background = '#7AE229';
    priority_button = "low";

}

function showCategory(){

    

    if (!openCategory){
        
        document.getElementById('categoryAll').innerHTML=`
        
        <a href="#" class="selectName" onclick="catchCategory('Backoffice')">Backoffice</a>
        <a href="#" class="selectName" onclick="catchCategory('Design')">Design</a>
        <a href="#" class="selectName" onclick="catchCategory('Software')">Software</a>
        <a href="#" class="selectName" onclick="catchCategory('Hardware')">Hardware</a>
        `;
        openCategory=true;
    }

    else if (openCategory) {
        document.getElementById('selectAll').innerHTML = '';
        openCategory = false;


    }
}

function catchCategory(i){

    document.getElementById('categoryNew').value=i;
    document.getElementById('categoryAll').innerHTML = '';
    openCategory = false;
}

function showContact() {



    if (!openContact) {

        for (let i = 0; i < contacts.length; i++) {

            document.getElementById('selectAll').innerHTML += allContacts(i);
        }
        openContact = true;
    }


    else if (openContact) {

        document.getElementById('selectAll').innerHTML = '';
        openContact = false;

    }
}

/////
function allContacts(i) {
    let name = contacts[i].fullname;
    let nameWithoutSpace=name.replace(/\s/g,'');
    selectNames.push(name);
    selectNamesWithoutSpace.push(nameWithoutSpace);
    return `
    
                <a href="#" class="selectName">
                 <label for="${nameWithoutSpace}">${name}</label>
                    <div>
                <input   type="checkbox" id="${nameWithoutSpace}" name="${nameWithoutSpace}" value="${name}">
                    </div>
                </a>

            `;

}



