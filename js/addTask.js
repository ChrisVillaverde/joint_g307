let priority_button;


function clickPriority (priority) {

    let button_prio_high=document.getElementById('button_prio_high');
    let button_prio_middle=document.getElementById('button_prio_middle');
    let button_prio_low=document.getElementById('button_prio_low');

    if(priority == "high") {
        
        button_prio_high.style.background='#FF3D00';
        button_prio_middle.style.background='white';
        button_prio_low.style.background='white';
        priority_button="high";
    }

    if(priority == "middle") {
        
        button_prio_high.style.background='white';
        button_prio_middle.style.background='#FFA800';
        button_prio_low.style.background='white';
        priority_button="middle";
    }

    if(priority == "low") {
        
        button_prio_high.style.background='white';
        button_prio_middle.style.background='white';
        button_prio_low.style.background='#7AE229';
        priority_button="low";
    }
    console.log(priority_button);
}