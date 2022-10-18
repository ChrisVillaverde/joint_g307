
let currentDraggedElement ;
let todosTasksNumber =0;
let doneTasksNumber =0;
let feedbackTasksNumber =0;
let progressTasksNumber =0;
let urgentTasksNumber =0;
let priority_selected = "";
let loggedUserName = [];
let filteredTasks = [];
/* let selectNames=[]; */
/* let selectNamesWithoutSpace=[]; */

async function init_board() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadUser();
    await loadTask(); 
    await loadContacts();
    filteredTasks = tasks;
    updateHTML();
}

async function init_summary() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadUser();
    await loadTask(); 
    loadUserName();
    dashboard();
}

async function loadUser(){
    users = await JSON.parse(backend.getItem('users')) || [];
    guests = await JSON.parse(backend.getItem('guests')) || [];    
}

async function loadContacts() {
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
}

function openNav() {
    document.getElementById("myNav").style.width = "30%";
    document.getElementById("board-body").style.opacity = "0.5";
    document.getElementById("board-body").style.pointerEvents = 'none';
}
  
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("board-body").style.opacity = "1";
    document.getElementById("board-body").style.pointerEvents = 'auto';
}

async function loadTask() {

    tasks = await backend.getItem('tasks') || [];

}

function allowDrop(ev) {
    ev.preventDefault();
    
  }

function moveTo(state){
    tasks[currentDraggedElement]['state'] = state;
    saveTask();
    updateHTML();
  }

  function highlight(id){
    document.getElementById(id).classList.add('hightlight-drag-area');

  }

  function removehighlight(){
    document.getElementById('alltasks_todo').classList.remove('hightlight-drag-area');
    document.getElementById('alltasks_progress').classList.remove('hightlight-drag-area');
    document.getElementById('alltasks_feedback').classList.remove('hightlight-drag-area');
    document.getElementById('alltasks_done').classList.remove('hightlight-drag-area');
  }

  function updateHTML(){
    updateTodoHTML();
    updateProgressHTML();
    updateFeedbackHTML();
    updateDoneHTML();
    
  }

  function handlerFilteredTasks(){
    let search = document.getElementById('inputTask').value;
    search = search.toLowerCase();
    if(search.length == 0){
        filteredTasks = tasks;
    }
        
    else{
        filteredTasks = tasks.filter( t => String(t.title).toLowerCase().startsWith(search) );
        console.log(filteredTasks);
    }
    updateHTML();
        
  }

  function updateTodoHTML(){
    let todos = filteredTasks.filter(t => t['state'] == 'todo');
    document.getElementById('alltasks_todo').innerHTML = '';
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        document.getElementById('alltasks_todo').innerHTML += generateTasksHTML(element);
        progressBarHTML(element);
           
    }
    assignedUserHTML(todos);
    
   
       
}

  function updateProgressHTML(){
    let progresses = filteredTasks.filter(t => t['state'] == 'progress');
    document.getElementById('alltasks_progress').innerHTML = '';
    for (let index = 0; index < progresses.length; index++) {
        const element = progresses[index];
        document.getElementById('alltasks_progress').innerHTML += generateTasksHTML(element);
       
        
    }
    assignedUserHTML(progresses);
  
    
}

function updateFeedbackHTML(){
    let feedbacks = filteredTasks.filter(t => t['state'] == 'feedback');
    document.getElementById('alltasks_feedback').innerHTML = '';
    for (let index = 0; index < feedbacks.length; index++) {
        const element = feedbacks[index];
        document.getElementById('alltasks_feedback').innerHTML += generateTasksHTML(element);
        
        
    }
    assignedUserHTML(feedbacks);
    
}

function updateDoneHTML(){
    let dones = filteredTasks.filter(t => t['state'] == 'done');
    document.getElementById('alltasks_done').innerHTML = '';
    for (let index = 0; index < dones.length; index++) {
        const element = dones[index];
        document.getElementById('alltasks_done').innerHTML += generateTasksHTML(element);
        progressBarHTML(element);
        
    }
    assignedUserHTML(dones);
   
}

function startDragging(id){
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if(element['id'] == id){
            currentDraggedElement = i;
            break;
        }     
    }  
    
}

function generateTasksHTML(element){
    let urlImg;
    if(element['priority']=='low'){
        urlImg = "./assets/img/green_arrow.png";
    }
    if(element['priority']=='high'){
        urlImg = "./assets/img/red_arrow.png";
    }
    if(element['priority']=='middle'){
        urlImg = "./assets/img/medium.png";
    }

    return /*html*/ `
    <div class="doneTask_1" onclick="popCardOver(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})">
                <div class="doneTaskCard-child">
                    <div class="doneTaskCard">
                        <div class="doneTaskCard-name"><span class="doneTaskCard-text">${element['category']}</span></div>
                        <div class="taskCard-title">
                            <div class="taskCard-description">
                                <span class="taskCard-description-title">${element['title']}</span>
                                <span class="taskCard-description-text">${element['description']}</span>
                            </div>
                            <div id="progressBar_${element['id']}" class= "progressBar">
                                <!-- <img src="./assets/img/progressbar.png" alt="">
                                <span id="doneNumber">3/3 Done</span> -->
                
                            </div>

                            <div class="user-priority">
                                <div id="user-id_${element['id']}" class="abbreviations">                               

                                </div>
                                <div class="taskPriority">                                   
                                     <img id="taskPriority-img" src=${urlImg} alt=""> 
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
                
            </div>


    `;
}

function assignedUserHTML(element){
   
   for (let index = 0; index < element.length; index++) {
    const names = element[index]['selectContacts'];
    const id = element[index]['id'];
      
        let assignedUser = names;
        let ShortName ;
        for (let j = 0; j < assignedUser.length; j++) {
            const userFullName = assignedUser[j];
            const indexSpace = userFullName.indexOf(' ') ; 
            if (indexSpace == -1) {
                 ShortName = userFullName.charAt(0) + userFullName.slice(-1);
                
            }else {
                 ShortName = userFullName.charAt(0) + userFullName.charAt(indexSpace+1); 
            }
                   
            document.getElementById('user-id_'+ id).innerHTML += /*html*/`
            <div class="user-id-child_1" > <span class="userName" >${ShortName.toUpperCase()}</span> </div>
        
            `;
           
        }       
    }

}

function progressBarHTML(element){
    const id = element['id'];
    document.getElementById('progressBar_'+ id).innerHTML = /*html*/`
    <img src="./assets/img/progressbar.png" alt="">
    <span id="doneNumber">3/3 Done</span>
        
    `;
}

function generateTasksStatusHTML(element){
    let urlImg;
    if(element['priority']=='low'){
        urlImg = "./assets/img/green_arrow.png";
    }
    if(element['priority']=='high'){
        urlImg = "./assets/img/red_arrow.png";
    }
    if(element['priority']=='middle'){
        urlImg = "./assets/img/medium.png";
    }

    return /*html*/ `
    <div class="feedbackTask_1" draggable="true" ondragstart="startDragging(${element['id']})">
        <div id="feedbackTaskCard">
        <div id="feedbackTaskCard-name"><span id="feedbackTaskCard-text">${element['category']}</span></div>
        <div class="taskCard-title">
            <div class="taskCard-description">
                <span class="taskCard-description-title">${element['title']}</span>
                <span class="taskCard-description-text">${element['description']}</span>
            </div>
            <div id="user-priority">
                <div id="user-id-pf__${element['id']}">
                    <!-- <div class="user-id-child_1"> <span class="userName" >SM</span> </div>
                    <div class="user-id-child_2"> <span class="userName" >MV</span> </div> -->

                </div>
                <div class="taskPriority"> <img id="taskPriority-img" src= ${urlImg} alt=""> </div>
            </div>
        </div>
                
    </div>


    `;
}

function dashboard(){
    
    if(loggedUserName[0]){
        document.getElementById('greeting-child').innerHTML =`Good morning <b id="greet"> ${loggedUserName} </b> `;
    }
    
    document.getElementById('dashboard').innerHTML =generateDashboardHTML() ;
}

function openBoard(){
    window.open('board.html', "_self");
}

function generateDashboardHTML(){
    progressTasksNumber=tasks.filter(t => t['state'] == 'progress');
    todosTasksNumber=tasks.filter(t => t['state'] == 'todo');
    feedbackTasksNumber=tasks.filter(t => t['state'] == 'feedback');
    doneTasksNumber=tasks.filter(t => t['state'] == 'done');
    urgentTasksNumber=tasks.filter(t => t['priority'] == 'high');

    return /*html*/ `
     <div id="dashboard-child1">
            <div id="dashboard-child11" onclick="openBoard()">
                <div id="urgent-dashboard">
                   <div id="urgent-dashboard-child">
                        <img id="urgent-img" src="./assets/img/urgent.png" alt="">
                        <span id="urgentTasksNumber">${urgentTasksNumber.length}</span>
                   </div> 
                    
                    <span class="urgent-text">Tasks Urgent</span>

                </div>

                <img id="strich_summary" src="./assets/img/strich_summary.png" alt="">

                <div id="urgent-dashboard-child2">
                    <span id="urgent-date">October 16, 2022</span>
                    <span id="date-text">Upcoming Deadline</span> 

                </div>

            </div>
            <div id="dashboard-child12" onclick="openBoard()">
                <div id="todos-dashboard">
                    <div id="todos-dashboard-child">
                         <img id="todos-img" src="./assets/img/board.png" alt="">
                         <span id="todosTasksNumber">${todosTasksNumber.length}</span>
                    </div> 
                     
                     <span id="todos-text">Tasks To-do</span>
 
                </div>

            </div>

        </div>

        <div id="dashboard-child2">
            <div id="dashboard-child21" onclick="openBoard()">
                <div class="dashboard-child2-all">
                     <div id="board-dashboard-child" class="dashboard-child2x">
                        <img id="board-img" src="./assets/img/board.png" alt="">
                        <span id="boardTasksNumber" class="tasksNumber">${tasks.length}</span>
                    </div> 
                
                    <span id="board-text">Tasks in Board</span>
                </div>
               

            </div>
            <div id="dashboard-child22" onclick="openBoard()">
                <div class="dashboard-child2-all">
                    <div id="progress-dashboard-child" class="dashboard-child2x">
                        <img id="progress-img" src="./assets/img/progress.png" alt="">
                        <span id="progressTasksNumber" class="tasksNumber">${progressTasksNumber.length}</span>
                    </div> 
                    
                    <span id="progress-text">Tasks in Progress</span>
                </div>

            </div>

            <div id="dashboard-child23" onclick="openBoard()">
                <div class="dashboard-child2-all">
                    <div id="feedback-dashboard-child" class="dashboard-child2x">
                        <img id="feedback-img" src="./assets/img/feedback.png" alt="">
                        <span id="feedbackTasksNumber" class="tasksNumber">${feedbackTasksNumber.length}</span>
                    </div> 
                    
                    <span id="feedback-text">Awaiting Feedback</span>
                </div>

            </div>
            <div id="dashboard-child24" onclick="openBoard()">
                <div class="dashboard-child2-all">
                    <div id="done-dashboard-child" class="dashboard-child2x">
                        
                        <img id="done-img" src="./assets/img/done.png" alt="">
                        <span id="doneTasksNumber" class="tasksNumber">${doneTasksNumber.length}</span>
                    </div> 
                    
                    <span id="done-text">Tasks Done</span>
                </div>

            </div>

        </div>


    `;
}

/**
 * This function load the user name from the local storage
 */
 function loadUserName(){
    let loggedUserNameAsText = localStorage.getItem('Name');
    /* let test=localStorage.getItem('Mail'); */
     loggedUserName = JSON.parse(loggedUserNameAsText);

}

async function saveTask() {
    await backend.setItem('tasks', tasks);
    

}

async function generateOverlay(state){
    document.getElementById("myNav").innerHTML =/*html*/ `
    <img class="closebtn" onclick="closeNav()" src="./assets/img/closeX.png" alt="">
    <div id="createTask-overlay">
       <span class="addTask-text-overlay">Add Task</span>
         
        
    </div>
    <div class="overlay-content">
        <div class="addTask-board">
        <form id="form_board"  onsubmit="addTask_board('${state}'); return false;">
            <div class="left-box">
                <!--Title-->
    
                    <input class="title-board" id="title" type="text" required placeholder="Enter a title">
    
    
                <!--Select Contacts-->
                  
                <div class="selectContacts">
                    <div class="input_select_contacts">
                        <input id="selectContacts"  type="text" readonly="readonly" required placeholder="Select contacts to assign" >
                        <img src="assets/img/dropdown_arrow.png" onclick="showContact()">
                    </div>
            
                    <div id="selectAll" class="selectAll"> </div> 
                                      
                </div>
                
    
    
                <!--Due Date-->
    
                    <span>Due date</span>
                    <div class="dueDate" onclick="showDate()"  >
                    <input id="dueDate" minlength="10" maxlength="10" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" type="text" required placeholder="dd/mm/yyyy">
                    <img src="assets/img/calendar-event.png" onclick="showDateToday()">
                </div>
    
                <!--Category-->
                
                    <span>Category</span>
                    <div class="selectContacts"   >
                        <div class="input_select_contacts">
                            <input id="categoryNew"  type="text" readonly="readonly" required placeholder="Select Task category" >
                            <img src="assets/img/dropdown_arrow.png" onclick="showCategory()">
                        </div>
                
                        <div id="categoryAll" class="selectAll"> </div> 
                
                        
                    </div>
    
                    <!-- <select required id="category" class="category" >
                        <option value="" disabled selected hidden>Select Task category</option>
                        <option value="">New category</option> 
                        <option value="Sales">Sales <img src="" alt=""></option>
                        <option value="Backoffice">Backoffice</option>
                        <option value="Design">Design</option>
                    </select> -->
    
                
                <!--Priority-->
    
                <div class="priority">
    
                    <button id="button_prio_high" onclick="clickPriority ('high')" value="high" type="button"  class="b1">Urgent <img src="assets/img/red_arrow.png"></button> 
    
                    <button id="button_prio_middle" onclick="clickPriority ('middle')" value="middle" type="button" class="b2">Medium <img src="assets/img/medium.png"></button>
    
                    <button id="button_prio_low" onclick="clickPriority ('low') " value="low" type="button"  class="b3">Low <img src="assets/img/green_arrow.png"></button>
    
                </div>   
                 
    
                <!--Description-->
                    
                    <span>Description</span>
    
                    <textarea required class="description"  type="text"
                    
                    id="description"  placeholder="Enter a description..">
    
                    </textarea>

                    <button class="createTask-btn" onclick="taskAddedToBord_board()" type="submit" value="Submit"> <span class="createTask-btn-text">Create task</span>  <img class="createTask-btn-img" src="./assets/img/checkOK.png" alt="">

                    </button>
    
            </div>
                <!--Add Task Button Confirm-->
            
    
            </div>
            
            
            </form>
    
            <div class="showCreateTask d-none" id="showCreateTask">Task added to board</div>
    </div>
  </div>
    
    `;
    updateHTML();

}

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById('alltasks_todo').classList.add('scroll-class');
        document.getElementById('alltasks_progress').classList.add('scroll-class');
        document.getElementById('alltasks_feedback').classList.add('scroll-class');
        document.getElementById('alltasks_done').classList.add('scroll-class');
    
    }else{
        document.getElementById('alltasks_todo').classList.remove('scroll-class');
        document.getElementById('alltasks_progress').classList.remove('scroll-class');
        document.getElementById('alltasks_feedback').classList.remove('scroll-class');
        document.getElementById('alltasks_done').classList.remove('scroll-class');
    }
};



function taskAddedToBord_board() {

    closeNav();
    document.getElementById('showCreateTask').classList.remove('d-none');



    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('downShowCreateTask');
    }, 2000)

    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('d-none');
        document.getElementById('showCreateTask').classList.remove('downShowCreateTask');
    }, 2300)



}



async function addTask_board(status) {

    let idNew = idlogic();

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
            'id': idNew,
            'state': status

        });

    await saveTask();

    taskAddedToBord_board();
    updateHTML();
    
}

function idlogic(){

    ids = tasks.map((number) => {
        return number.id
    })

    let onlyNumbers = ids.filter(
        element => typeof element === 'number'
    );

    let id = Math.max(...onlyNumbers) + 1;
    if (!id || id == -Infinity) {
        id = 1;
        return id;
    }
    return id;

}

/* function taskAddedToBord_board() {

    document.getElementById('showCreateTask').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('downShowCreateTask');
    }, 2000)

    setTimeout(() => {
        document.getElementById('showCreateTask').classList.add('d-none');
        document.getElementById('showCreateTask').classList.remove('downShowCreateTask');
    }, 2300)

} */

function popCardOver(id){
    let names 
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index]['id'];
        if (id == element) {
            selectedTaskCard = tasks[index];
            names = tasks[index]['selectContacts'];
            break;           
        }
        
    }
    var modal = document.getElementById("task-content");
      
    document.getElementById('taskCardName-child').innerHTML = `${selectedTaskCard['category']}`;
    document.getElementById('taskCardDescription').innerHTML = `${selectedTaskCard['title']}`;
    document.getElementById('taskCardText').innerHTML = `${selectedTaskCard['description']}`;
    if (selectedTaskCard['priority']=='low') {
        document.getElementById('taskPrioritycontent-child').innerHTML = `
        <button id="button_prio_low" type="button"  class="b3 low-color">Low <img src="assets/img/green_arrow.png"></button>
        `;
    }
    if (selectedTaskCard['priority']=='middle') {
        document.getElementById('taskPrioritycontent-child').innerHTML = `
        <button id="button_prio_middle" type="button" class="b2 middle-color">Medium <img src="assets/img/medium.png"></button>
        `;
    }
    if (selectedTaskCard['priority']=='high') {
        document.getElementById('taskPrioritycontent-child').innerHTML = `
        <button id="button_prio_high" type="button"  class="b1 high-color">Urgent <img src="assets/img/red_arrow.png"></button>
        `;
    }
    document.getElementById('taskDatecontent-child').innerHTML = `${selectedTaskCard['date']}`;
    
    document.getElementById('editCardBtn').innerHTML = `
        <div class="edit-img" onclick="cardEdit(${id})">
        <img class="edit-btn" src="/assets/img/edit_button.png" alt="">
        </div>
    `;
    
    assignedUserPopUpCard(names);
    modal.style.display = "flex";   
    document.getElementById("board-body").style.opacity = "0.5";
    document.getElementById("board-body").style.pointerEvents = 'none';

}

function assignedUserPopUpCard(names){
    let assignedUser = names;
    let ShortName;
    for (let i = 0; i < assignedUser.length; i++) {
        document.getElementById('assignedUser').innerHTML +=`
        <div id="assignedUser_${i}" class="assignedUser-child"></div>
        `;
        
    }
         
         for (let j = 0; j < assignedUser.length; j++) {
             const userFullName = assignedUser[j];
             const indexSpace = userFullName.indexOf(' ') ; 
             if (indexSpace == -1) {
                  ShortName = userFullName.charAt(0) + userFullName.slice(-1);
                 
             }else {
                  ShortName = userFullName.charAt(0) + userFullName.charAt(indexSpace+1); 
             }                   
             document.getElementById('assignedUser_'+ j).innerHTML += /*html*/`
             <div class="assignedUserName"> 
                <span class="assignedUserName-child" >${ShortName.toUpperCase()}</span>
             </div>
              <span class="assignedUserNameText"> ${userFullName}<br><br></span>               
                        
         
             `;
            
         }       
}


function popCardOverClose(){
    var modal = document.getElementById("task-content");
    document.getElementById('taskCardDescription').contentEditable = false;
    document.getElementById('taskCardText').contentEditable = false;
    document.getElementById('taskDatecontent-child').contentEditable = false;
    document.getElementById('taskCardName-child').contentEditable = false;
    document.getElementById('assignedUser').innerHTML=``;
    modal.style.display = "none";
    document.getElementById("board-body").style.opacity = "1";
    document.getElementById("board-body").style.pointerEvents = 'auto';

}

function cardEdit(id){
    document.getElementById('taskCardDescription').contentEditable = true;
    document.getElementById('taskCardText').contentEditable = true;
    document.getElementById('taskDatecontent-child').contentEditable = true;
    document.getElementById('taskCardName-child').contentEditable = true;
    document.getElementById('taskPrioritycontent-child').innerHTML = `
    <button id="button_prio_high1" onclick="clickPriority_board ('high')" value="high" type="button"  class="b1">Urgent <img src="assets/img/red_arrow.png"></button> 
    
    <button id="button_prio_middle1" onclick="clickPriority_board ('middle')" value="middle" type="button" class="b2">Medium <img src="assets/img/medium.png"></button>

    <button id="button_prio_low1" onclick="clickPriority_board ('low') " value="low" type="button"  class="b3">Low <img src="assets/img/green_arrow.png"></button>
    
    `;

    document.getElementById('assignedUser').innerHTML = `
        <div class="input_select_contacts">
            <input id="selectContacts1"  type="text" readonly="readonly" required placeholder="Select contacts to assign" >
            <img src="assets/img/dropdown_arrow.png" onclick="showContact_board()">
        </div>
        <div id="selectAll1" class="selectAll"> </div> 
    `;

    document.getElementById('editCardBtn').innerHTML = `
    <button class="saveEdit-btn" onclick="saveCard(${id})" > <span class="addTask-btn-text">Save</span>  </button>
`;
    

}

function showContact_board() {

    if (!openContact) {

        for (let i = 0; i < contacts.length; i++) {

            document.getElementById('selectAll1').innerHTML += allContacts_board(i);
        }
        openContact = true;
    }

    else if (openContact) {

        document.getElementById('selectAll1').innerHTML = '';
        openContact = false;

    }
}


function allContacts_board(i) {
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

function clickPriority_board(priority) {

    let button_prio_high = document.getElementById('button_prio_high1');
    let button_prio_middle = document.getElementById('button_prio_middle1');
    let button_prio_low = document.getElementById('button_prio_low1');

    if (priority == "high") {
        button_prio_high.style.background = '#FF3D00';
        priority_selected = "high";
    }

    if (priority == "middle") {
        priority_selected = "middle";
        button_prio_middle.style.background = '#FFA800';
    }

    if (priority == "low") {
        priority_selected = "low";
        button_prio_low.style.background = '#7AE229';
    }

}

async function saveCard(id){

    let selectContacts = [];
    
    for (let i=0;i<selectNames.length;i++){

        if (document.getElementById(selectNamesWithoutSpace[i]).checked) {

            selectContacts.push(document.getElementById(selectNamesWithoutSpace[i]).value);
        }
    }
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index]['id'];
        
        if (id == element) {
            
            tasks[index]['title'] =  document.getElementById('taskCardDescription').innerHTML;
            tasks[index]['description'] =  document.getElementById('taskCardText').innerHTML;
            tasks[index]['category'] =  document.getElementById('taskCardName-child').innerHTML;
            tasks[index]['date'] =  document.getElementById('taskDatecontent-child').innerHTML;
            tasks[index]['priority'] =  priority_selected;
            tasks[index]['selectContacts'] =  selectContacts;
            /* selectedTaskCard = tasks[index]; */
            break;           
        }
        
    }

    
    await saveTask();

    popCardOverClose();
    updateHTML();

}

