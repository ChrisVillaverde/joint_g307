let priority_button;
let tasks = [];
let openContact;



function showDate() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

  
    today = dd + '/' + mm + '/' + yyyy;
    document.getElementById("dueDate").value = today;

}



function taskAddedToBord() {

    alert('Animation Task Added To Bord');
    //Taskpaper delete content HTML

}

function addTask() {

    let title = document.getElementById('title');
    let selectContacts=[];
     if(document.getElementById('christian').checked){

            selectContacts.push(document.getElementById('christian').value);
     }

     if(document.getElementById('russell').checked){

        selectContacts.push(document.getElementById('russell').value);
     }

     if(document.getElementById('manuel').checked){

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
            'description': description.value
        });


     

}

function clickPriority(priority) {

    let button_prio_high = document.getElementById('button_prio_high');
    let button_prio_middle = document.getElementById('button_prio_middle');
    let button_prio_low = document.getElementById('button_prio_low');

    if (priority == "high") {

        button_prio_high.style.background = '#FF3D00';
        button_prio_middle.style.background = 'white';
        button_prio_low.style.background = 'white';
        priority_button = "high";
    }

    if (priority == "middle") {

        button_prio_high.style.background = 'white';
        button_prio_middle.style.background = '#FFA800';
        button_prio_low.style.background = 'white';
        priority_button = "middle";
    }

    if (priority == "low") {

        button_prio_high.style.background = 'white';
        button_prio_middle.style.background = 'white';
        button_prio_low.style.background = '#7AE229';
        priority_button = "low";
    }
    console.log(priority_button);
}


function showContact() {

    if(!openContact){
    document.getElementById('selectAll').innerHTML=`
    
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
    openContact=true;
}


    else if (openContact) {

        document.getElementById('selectAll').innerHTML='';
        openContact=false;

    }
}