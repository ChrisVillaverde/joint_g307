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
    'category': 'todo'
},
{
    'id': 2,
    'name': 'Backoffice',
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
    'name': 'Marketing',
    'title': 'Social media strategy',
    'description':'Develop and campaign for brand positioning',
    'category': 'feedback'
}];

let currentDraggedElement ;

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
        document.getElementById('alltasks_progress').innerHTML += generateTasksHTML(element);
        
    }
    
}

function updateFeedbackHTML(){
    let feedbacks = Alltasks_keys.filter(t => t['category'] == 'feedback');
    document.getElementById('alltasks_feedback').innerHTML = '';
    for (let index = 0; index < feedbacks.length; index++) {
        const element = feedbacks[index];
        document.getElementById('alltasks_feedback').innerHTML += generateTasksHTML(element);
        
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
    <div class="doneTask_1" class="allTasks_design" draggable="true" ondragstart="startDragging(${element['id']})">
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