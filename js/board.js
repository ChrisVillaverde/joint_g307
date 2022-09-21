let Alltasks_keys = [{
    'id': 0,
    'name': 'Design',
    'title': 'Social media strategy',
    'description':'Develop and campaign for brand positioning',
    'category': 'todo'
},
{
    'id': 1,
    'name': 'Design',
    'title': 'Social media strategy',
    'description':'Develop and campaign for brand positioning',
    'category': 'done'
},
{
    'id': 2,
    'name': 'Marketing',
    'title': 'Social media strategy',
    'description':'Develop and campaign for brand positioning',
    'category': 'done'
},
{
    'id': 3,
    'name': 'Sales',
    'title': 'Social media strategy',
    'description':'Develop and campaign for brand positioning',
    'category': 'progress'
},
{
    'id': 4,
    'name': 'Backoffice',
    'title': 'Accounting invoices',
    'description':'Write open invoices for customer',
    'category': 'feedback'
}];

let currentDraggedElement ;
let todosTasksNumber =0;
let doneTasksNumber =0;
let feedbackTasksNumber =0;
let progressTasksNumber =0;

function allowDrop(ev) {
    ev.preventDefault();
    
  }

  function moveTo(category){
    Alltasks_keys[currentDraggedElement]['category'] = category;
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
    let todos = Alltasks_keys.filter(t => t['category'] == 'todo');
    document.getElementById('alltasks_todo').innerHTML = '';
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        document.getElementById('alltasks_todo').innerHTML += generateTasksHTML(element);
        
    }
    
}
  function updateProgressHTML(){
    let progresses = Alltasks_keys.filter(t => t['category'] == 'progress');
    document.getElementById('alltasks_progress').innerHTML = '';
    for (let index = 0; index < progresses.length; index++) {
        const element = progresses[index];
        document.getElementById('alltasks_progress').innerHTML += generateTasksStatusHTML(element);
        
    }
    
}

function updateFeedbackHTML(){
    let feedbacks = Alltasks_keys.filter(t => t['category'] == 'feedback');
    document.getElementById('alltasks_feedback').innerHTML = '';
    for (let index = 0; index < feedbacks.length; index++) {
        const element = feedbacks[index];
        document.getElementById('alltasks_feedback').innerHTML += generateTasksStatusHTML(element);
        
    }
    
}

function updateDoneHTML(){
    let dones = Alltasks_keys.filter(t => t['category'] == 'done');
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
                        <div id="doneTaskCard-name"><span id="doneTaskCard-text">${element['name']}</span></div>
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
        <div id="feedbackTaskCard-name"><span id="feedbackTaskCard-text">${element['name']}</span></div>
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
    document.getElementById('greet').innerHTML =`<b id="summary-greeting" > Good morning </b>`; ;
    document.getElementById('dashboard').innerHTML =generateDashboardHTML() ;
}

function generateDashboardHTML(){
    progressTasksNumber=Alltasks_keys.filter(t => t['category'] == 'progress');
    todosTasksNumber=Alltasks_keys.filter(t => t['category'] == 'todo');
    feedbackTasksNumber=Alltasks_keys.filter(t => t['category'] == 'feedback');
    doneTasksNumber=Alltasks_keys.filter(t => t['category'] == 'done');

    return /*html*/ `
     <div id="dashboard-child1">
            <div id="dashboard-child11">
                <div id="urgent-dashboard">
                   <div id="urgent-dashboard-child">
                        <img id="urgent-img" src="./assets/img/urgent.png" alt="">
                        <span id="urgentTasksNumber">1</span>
                   </div> 
                    
                    <span id="urgent-text">Tasks Urgent</span>

                </div>

                <img src="./assets/img/strich_summary.png" alt="">

                <div id="urgent-dashboard-child2">
                    <span id="urgent-date">October 16, 2022</span>
                    <span id="date-text">Upcoming Deadline</span> 

                </div>

            </div>
            <div id="dashboard-child12">
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
            <div id="dashboard-child21" >
                <div class="dashboard-child2-all">
                     <div id="board-dashboard-child" class="dashboard-child2x">
                        <img id="board-img" src="./assets/img/board.png" alt="">
                        <span id="boardTasksNumber" class="tasksNumber">${Alltasks_keys.length}</span>
                    </div> 
                
                    <span id="board-text">Tasks in Board</span>
                </div>
               

            </div>
            <div id="dashboard-child22">
                <div class="dashboard-child2-all">
                    <div id="progress-dashboard-child" class="dashboard-child2x">
                        <img id="progress-img" src="./assets/img/progress.png" alt="">
                        <span id="progressTasksNumber" class="tasksNumber">${progressTasksNumber.length}</span>
                    </div> 
                    
                    <span id="progress-text">Tasks in Progress</span>
                </div>

            </div>

            <div id="dashboard-child23">
                <div class="dashboard-child2-all">
                    <div id="feedback-dashboard-child" class="dashboard-child2x">
                        <img id="feedback-img" src="./assets/img/feedback.png" alt="">
                        <span id="feedbackTasksNumber" class="tasksNumber">${feedbackTasksNumber.length}</span>
                    </div> 
                    
                    <span id="feedback-text">Awaiting Feedback</span>
                </div>

            </div>
            <div id="dashboard-child24">
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