
  // TODO: Add code to display the current date in the header of the page.

//formating as class single slot 


let schedule;

window.addEventListener("load", (event) => {
        schedule = localStorage.getItem("schedule")
        if (schedule == undefined) {
                schedule = []      
                localStorage.setItem('schedule',JSON.stringify(schedule))
        }else{
                schedule = JSON.parse(localStorage.getItem('schedule'))
                console.log(schedule)
              }
        
        for(let i = 9; i < 18; i ++){
        logSlots(i)
        populateTextArea(i)
        populateSaveButton(i)
        }
        //populate timeslots
      });
      


      
class Slot{
	constructor(state, time){
		this.state = state;
		this.time = time;
		this.templet = `
      <div id="hour-${time}" class="row time-block ${this.state}">
      <div class="col-2 col-md-1 hour text-center py-3">${this.time}:00 </div>
      <textarea id="text-hour-${time}" class="col-8 col-md-10 description" rows="3"> </textarea>
      <button id="btn-hour-${time}" class="btn saveBtn col-2 col-md-1" onclick ="clickNSave(${this.time})"aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
      </button>
      </div>`
                this.text = ""
		} 
}
// class for slot ==============================================================================================
//date: hour
const d = new Date();
function stateCheck(i){
        let difference = i - d.getHours()
        //check if it's past for future
        if(difference == 0){
                return 'present'
        }else if (difference <= 0){
                return 'past'
        }else{
                return 'future'
        }
}
//slot for date check =================

function logSlots(i){
        console.log(schedule)
        let slotOne = new Slot(stateCheck(i), i)
        schedule.push(slotOne)
        //push it into the array
        timeSlots_placeHold.innerHTML += slotOne.templet
}

const timeSlots_placeHold = document.querySelector('#timeslots')



function populateTextArea(i){
        console.log('working on populating texts')
        document.getElementById(`text-hour-${i}`).innerHTML = schedule[i - 9].text
}

//populate save with clicknsave function
function populateSaveButton (i){
        let saveBtn = document.querySelector(`#hour-${i}`).children[2]
        saveBtn.addEventListener('click', clickNSave)
}

function clickNSave (i) {
        console.log(`lets do it ${i}`)
        // finish up the clickNSave
        let text = document.getElementById(`text-hour-${i}`).value
        console.log(text)
        schedule[i - 9].text = text
        console.log(schedule[ i - 9 ].text )
        localStorage.setItem('schedule',JSON.stringify(schedule))
}

