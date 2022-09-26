/* let tasks = [{
    'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': 'high',
            'description': 'Write open invoices for customer',
            'id': 0,
            'state': 'todo'
},
{
    'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': 'high',
            'description': 'Write open invoices for customer',
            'id': 1,
            'state': 'done'
},
{
    'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': "high",
            'description': 'Write open invoices for customer',
            'id': 2,
            'state': 'done'
},
{
    'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': 'high',
            'description': 'Write open invoices for customer',
            'id': 3,
            'state': 'progress'
},
{
    'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': 'high',
            'description': 'Write open invoices for customer',
            'id': 4,
            'state': 'feedback'
}];  */
            

/* 'title': 'Accounting invoices',
            'selectContacts': selectContacts,
            'date': new Date().getTime(),
            'category':  'Backoffice',
            'priority': priority_button,
            'description': 'Write open invoices for customer',
            'id': id,
            'state': 'feedback'

 */

let currentDraggedElement ;
let todosTasksNumber =0;
let doneTasksNumber =0;
let feedbackTasksNumber =0;
let progressTasksNumber =0;
let urgentTasksNumber =0;
let loggedUserName = [];

/* let tasks=[];  */

async function init_board() {
    setURL('https://gruppe-307.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadUser();
    await loadTask(); 
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

function openNav() {
    document.getElementById("myNav").style.width = "28%";
    document.getElementById("board-body").style.opacity = "0.5";
}
  
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("board-body").style.opacity = "1";
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
    /* dashboard(); */
  }


  function updateTodoHTML(){
    let todos = tasks.filter(t => t['state'] == 'todo');
    document.getElementById('alltasks_todo').innerHTML = '';
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        document.getElementById('alltasks_todo').innerHTML += generateTasksHTML(element);
        
    }
    
}
  function updateProgressHTML(){
    let progresses = tasks.filter(t => t['state'] == 'progress');
    document.getElementById('alltasks_progress').innerHTML = '';
    for (let index = 0; index < progresses.length; index++) {
        const element = progresses[index];
        document.getElementById('alltasks_progress').innerHTML += generateTasksStatusHTML(element);
        
    }
    
}

function updateFeedbackHTML(){
    let feedbacks = tasks.filter(t => t['state'] == 'feedback');
    document.getElementById('alltasks_feedback').innerHTML = '';
    for (let index = 0; index < feedbacks.length; index++) {
        const element = feedbacks[index];
        document.getElementById('alltasks_feedback').innerHTML += generateTasksStatusHTML(element);
        
    }
    
}

function updateDoneHTML(){
    let dones = tasks.filter(t => t['state'] == 'done');
    document.getElementById('alltasks_done').innerHTML = '';
    for (let index = 0; index < dones.length; index++) {
        const element = dones[index];
        document.getElementById('alltasks_done').innerHTML += generateTasksHTML(element);
        
    }
    
}

function startDragging(id){
    currentDraggedElement = id;

}

function generateTasksHTML(element){

    return /*html*/ `
    <div class="doneTask_1" draggable="true" ondragstart="startDragging(${element['id']})">
                <div id="doneTaskCard-child">
                    <div id="doneTaskCard">
                        <div id="doneTaskCard-name"><span id="doneTaskCard-text">${element['category']}</span></div>
                        <div class="taskCard-title">
                            <div class="taskCard-description">
                                <span class="taskCard-description-title">${element['title']}</span>
                                <span class="taskCard-description-text">${element['description']}</span>
                            </div>
                            <div id="progressBar">
                                <img src="./assets/img/progressbar.png" alt="">
                                <span id="doneNumber">3/3 Done</span>
                
                            </div>

                            <div id="user-priority">
                                <div id="user-id">
                                    <div class="user-id-child_1"> <span class="userName" >SM</span> </div>
                                    <div class="user-id-child_2"> <span class="userName" >MV</span> </div>

                                </div>
                                <div id="taskPriority"> <img id="taskPriority-img" src="./assets/img/green_arrow.png" alt=""> </div>
                            </div>
                        </div>
    
                    </div>
                </div>
                
            </div>


    `;
}

function generateTasksStatusHTML(element){

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
                <div id="user-id">
                    <div class="user-id-child_1"> <span class="userName" >SM</span> </div>
                    <div class="user-id-child_2"> <span class="userName" >MV</span> </div>

                </div>
                <div id="taskPriority"> <img id="taskPriority-img" src="./assets/img/medium.png" alt=""> </div>
            </div>
        </div>
                
    </div>


    `;
}

function dashboard(){
    
    if(loggedUserName[0]){
        document.getElementById('greeting-child').innerHTML =`Good morning <b id="greet"> ${loggedUserName[0]} </b> `;
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
        <form id="form_board"  onsubmit="addTask(${state}); return false;">
            <div class="left-box">
                <!--Title-->
    
                    <input class="title-board" id="title" type="text" required placeholder="Enter a title">
    
    
                <!--Select Contacts-->
                  
                <div class="selectContacts"   >
                    <div class="input_select_contacts">
                        <input id="selectContacts"  type="text" readonly="readonly" required placeholder="Select contacts to assign" >
                        <img src="assets/img/dropdown_arrow.png" onclick="showContact()">
                    </div>
            
                    <div id="selectAll" class="selectAll"> </div> 
                                      
                </div>
                
    
    
                <!--Due Date-->
    
                    <span>Due date</span>
                    <div class="dueDate" onclick="showDate()"  >
                    <input id="dueDate"  type="text" required placeholder="dd/mm/yyyy">
                    <img src="assets/img/calendar-event.png">
                </div>
    
                <!--Category-->
                
                    <span>Category</span>
    
                    <select required id="category" class="category" >
                        <option value="" disabled selected hidden>Select Task category</option>
                     <!--   <option value="">New category</option> -->
                        <option value="Sales">Sales <img src="" alt=""></option>
                        <option value="Backoffice">Backoffice</option>
                        <option value="Design">Design</option>
                    </select>
    
                
                <!--Priority-->
    
                <div class="priority">
    
                    <button id="button_prio_high" onclick="clickPriority ('high')" value="high" type="button"  class="b1">Urgent <img src="assets/img/red_arrow.png"></button> 
    
                    <button id="button_prio_middle" onclick="clickPriority ('middle')" value="middle" type="button" class="b2">Medium <img src="assets/img/medium.png"></button>
    
                    <button id="button_prio_low" onclick="clickPriority ('low') " value="low" type="button"  class="b3">Low <img src="assets/img/green_arrow.png"></button>
    
                </div>   
                 
    
                <!--Description-->
                    
                    <span>Description</span>
    
                    <textarea required class="description-overlay"  type="text"
                    
                    id="description"  placeholder="Enter a description..">
    
                    </textarea>

                    <button class="createTask-btn" onclick="taskAddedToBord()" type="submit" value="Submit"> <span class="createTask-btn-text">Create task</span>  <img class="createTask-btn-img" src="./assets/img/checkOK.png" alt="">

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


