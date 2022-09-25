let priority_button;
let tasks = [];
let openContact;
let users = [];
let ids = [];



async function init() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadTask();

}

async function loadTask() {

    tasks = await backend.getItem('tasks') || [];

}

function showDate() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();


    today = dd + '/' + mm + '/' + yyyy;
    document.getElementById("dueDate").value = today;

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
    if (!id) {
        id = 1;
    }

    let title = document.getElementById('title');
    let selectContacts = [];
    if (document.getElementById('christian').checked) {

        selectContacts.push(document.getElementById('christian').value);
    }

    if (document.getElementById('russell').checked) {

        selectContacts.push(document.getElementById('russell').value);
    }

    if (document.getElementById('manuel').checked) {

        selectContacts.push(document.getElementById('manuel').value);
    }

    let category = document.getElementById('category');
    let description = document.getElementById('description');

    tasks.push(
        {
            'title': title.value,
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category': category.value,
            'priority': priority_button,
            'description': description.value,
            'id': id,
            'state': status

        });

    await saveTask();
    

}


async function saveTask() {
    await backend.setItem('tasks', tasks);
    let taskAsText = JSON.stringify(tasks);
    localStorage.setItem('Task', taskAsText);

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

function showContact() {

    if (!openContact) {
        document.getElementById('selectAll').innerHTML = `
    
    <a href="#" class="selectName">
        <label for="Russell">Russell</label>
        <div>
        <input   type="checkbox" id="russell" name="Russell" value="Russell">
        </div>
    </a>

    <a href="#" class="selectName">
        <label for="Christian">Christian</label>
        <div>
        <input  type="checkbox" id="christian" name="Christian" value="Christian">
        </div>
    </a>

    <a href="#" class="selectName">
        <label for="Manuel">Manuel</label>
        <div>
        <input  type="checkbox" id="manuel" name="Manuel" value="Manuel">
        </div>
    </a>    
    `;
        openContact = true;
    }


    else if (openContact) {

        document.getElementById('selectAll').innerHTML = '';
        openContact = false;

    }
}