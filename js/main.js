const addNewTaskBtn = document.querySelector(".addNewTaskBtn")

const writingSection = document.querySelector(".writingSection")
const textingArea = document.querySelector('.textingArea')
const addTaskTextArea = document.querySelector(".addTaskTextArea")
const taskValue = document.querySelector ('.taskValue')
const newTaskRow = document.querySelector('.newTaskRow')

const searchInput = document.getElementById('searchInput')
const myDocument = document.querySelector('.container')
let myIndexReveal = 0 
const deleteAllList = document.querySelector('.deleteAllList')

//function to show and hide text area



function toggleAddNewTaskBtn () {


        if ( writingSection.style.opacity == 0) {
            
            writingSection.style.opacity = 1
            writingSection.style.zIndex = "1"
        }
        else {
            writingSection.style.opacity = 0
            writingSection.style.zIndex = "-1"
            
        }




}
addNewTaskBtn.addEventListener('click' , toggleAddNewTaskBtn)



addTaskTextArea.addEventListener("click" , addNewTask)

let allTasks = []

if(localStorage.getItem('allTasks')) {

    allTasks = JSON.parse(localStorage.getItem('allTasks') ,
    searchInput.style.display = "block",
    deleteAllList.style.display = "block"

    

)

displayAllTasks()
}
 
console.log(allTasks.length);




 if   (   allTasks.length == 0) {
    searchInput.style.display = "none"
    deleteAllList.classList.add('d-none')


}




let dayDate = new Date ().toISOString().slice(0 , 10)



displayAllTasks ()

function addNewTask () {

    if(addTaskTextArea.innerHTML == 'add task') {

        const taskAddedSucc = document.querySelector('.taskAddedSucc')

        let allWrittenTasks = {

            taskContent : textingArea.value , 
            isCompleted : false , 
            dateOfTask : dayDate
        }
        
    allTasks.push(allWrittenTasks)
        localStorage.setItem('allTasks',JSON.stringify(allTasks))
    
        writingSection.style.opacity=0
        writingSection.style.zIndex=-2
        clearTextArea()
        displayAllTasks()
    deleteAllList.classList.remove('d-none')
    searchInput.classList.remove('d-none')
        searchInput.style.display='block'
    
        taskAddedSucc.style.opacity = 1
        taskAddedSucc.style.zIndex = '222'
    
       
        setTimeout(() => {
            taskAddedSucc.style.opacity = 0
            taskAddedSucc.style.zIndex = -5
    
    
        }, 1500);

    }

    else {

        let updatedAllWrittenTasks = {
            taskContent : textingArea.value , 
            isCompleted : false , 
            dateOfTask : dayDate
        }
        
        allTasks.splice(myIndexReveal , 1 , updatedAllWrittenTasks)
        addTaskTextArea.innerHTML = 'add task'
        writingSection.style.opacity=0
        writingSection.style.zIndex=-2
        clearTextArea()
        displayAllTasks()
        const taskUpdt=document.querySelector('.taskUpdt') 
        taskUpdt.style.opacity = 1
        taskUpdt.style.zIndex = '222'
    
       
        setTimeout(() => {
            taskUpdt.style.opacity = 0
            taskUpdt.style.zIndex = -5
    
    
        }, 1500);
        searchInput.style.display='block'
        localStorage.setItem('allTasks' , JSON.stringify(allTasks))
        
    }
  
    
}




function displayAllTasks () {

    let myDisplayedTasks = '' ;
    for (let i=0 ; i<allTasks.length ; i++) {


        myDisplayedTasks += `  

                    <div class="col-1">
         <div class="checkBox">
                    <div class="square d-flex" onclick = 'toggleCheckedTasks(${i})'></div>
                </div>
       

            </div>
            

            ${allTasks[i].isCompleted ? `<div class="col-11">       <div class="wirtingTask completedBg  border-bottom " >
                <div class="d-flex justify-content-between">
                    <p class="m-0 taskValue writingT done">${allTasks[i].taskContent}</p>
                  
                    <div class="editDeleteIcons">
                        <i  class="fa-regular fa-pen-to-square" onclick =' updateText(${i})'></i>
                        <i class="fa-regular fa-trash-can " onclick="deleteTask(${i})"></i>
                    </div>
                 
                </div>
    
            </div></div> ` : `<div class="col-11">       <div class="wirtingTask   border-bottom " >
                <div class="d-flex justify-content-between">
                
                    <p class="m-0 taskValue writingT">${allTasks[i].taskContent}</p>
                    <div class="editDeleteIcons">
                        <i  class="fa-regular fa-pen-to-square" onclick =' updateText(${i})'></i>
                        <i class="fa-regular fa-trash-can " onclick="deleteTask(${i})"></i>
                    </div>
                 
                </div>
                <span class = 'dateOfTask'> ${allTasks[i].dateOfTask} </span>
            </div></div>`}
            


  `



    }


    newTaskRow.innerHTML = myDisplayedTasks

}

function clearTextArea () {

    textingArea.value = ''
}


function deleteTask(index ) {
    const taskDeleted  = document.querySelector('.taskDeleted')
 allTasks.splice(index,1)

 displayAllTasks(allTasks)

    localStorage.setItem('allTasks' , JSON.stringify(allTasks))
   


    if(allTasks.length == 0 ) {
       searchInput.style.display = 'none',
       deleteAllList.style.display = 'none'
        
    }

    taskDeleted.style.opacity = 1
    taskDeleted.style.zIndex = '222'

   
    setTimeout(() => {
        taskDeleted.style.opacity = 0
        taskDeleted.style.zIndex = -5


    }, 1500);




   





}





function updateText (index) {

    searchInput.value = ``

    textingArea.value = allTasks[index].taskContent
    addTaskTextArea.innerHTML = 'update'
    writingSection.style.opacity = '1'
    writingSection.style.zIndex = '1'
    myIndexReveal = index



}



function toggleCheckedTasks(id) {
const taskCompleted = document.querySelector('.taskCompleted')
    allTasks[id].isCompleted == false ? allTasks[id].isCompleted = true :  allTasks[id].isCompleted = false


    if(allTasks[id].isCompleted == true) {
        taskCompleted.style.opacity = 1
        taskCompleted.style.zIndex = '222'
    
       
        setTimeout(() => {
            taskCompleted.style.opacity = 0
            taskCompleted.style.zIndex = -5
    
    
        }, 1500);
    }
    
    





    const taskValue = document.querySelectorAll('.taskValue')
    const writingBg = document.querySelectorAll('.wirtingTask ')

    
    allTasks[id].isCompleted == true ? taskValue[id].classList.add('done') :  taskValue[id].classList.remove('done')
    allTasks[id].isCompleted == true ? writingBg[id].classList.add('completedBg') :  writingBg[id].classList.remove('completedBg')

    localStorage.setItem('allTasks' , JSON.stringify(allTasks))
   
    

}









function searchByWord(term) {

    
    
    
    let myDisplayedTasks = '' ;
    for (let i=0 ; i<allTasks.length ; i++) {
            if(allTasks[i].taskContent.toLowerCase().includes(term.toLowerCase() )) {
                
                
                     myDisplayedTasks += `  
                ${allTasks[i].isCompleted ? `
                <div class="col-1">
     <div class="checkBox">
                <div class="square d-flex"   onclick ='toggleCheckedTasks(${i})'></div>
            </div>
   

        </div>
        
        <div class="col-11">       <div class="wirtingTask completedBg  border-bottom ">
            <div class="d-flex justify-content-between">
                <p class="m-0 taskValue writingT done">${allTasks[i].taskContent.toLowerCase().replace(term.trim().toLowerCase() ,`<span style="background-color: #FFFF00" >${term} </span>` ).trim()}</p>
                <div class="editDeleteIcons">
                    <i  class="fa-regular fa-pen-to-square"  onclick =' updateText(${i})'></i>
                    <i class="fa-regular fa-trash-can " onclick="deleteTask(${i})"></i>
                </div>
             
            </div>

        </div></div>` : `
                <div class="col-1">
     <div class="checkBox">
                <div class="square d-flex" onclick ='toggleCheckedTasks(${i})'></div>
            </div>
   

        </div>
        
        <div class="col-11">       <div class="wirtingTask   border-bottom ">
            <div class="d-flex justify-content-between">
                <p class="m-0 taskValue writingT">${allTasks[i].taskContent.toLowerCase().replace(term.trim().toLowerCase() ,`<span style="background-color: #FFFF00" >${term} </span>` ).trim()}</p>
                <div class="editDeleteIcons">
                    <i  class="fa-regular fa-pen-to-square"  onclick =' updateText(${i})'></i>
                    <i class="fa-regular fa-trash-can " onclick="deleteTask(${i})"></i>
                </div>
             
            </div>
                <span class = 'dateOfTask'> ${allTasks[i].dateOfTask} </span>

        </div></div>`}


`



}


    


            
            
        
      




    }



    
    myDisplayedTasks ?     newTaskRow.innerHTML = myDisplayedTasks : newTaskRow.innerHTML = `<p> No Tasks Found </p>`


 
   

    
}





searchInput.addEventListener('input' , function(){
    searchByWord(this.value)
})




deleteAllList.addEventListener('click' , emptyList)
function emptyList() {

    localStorage.removeItem('allTasks')
    allTasks = []
    displayAllTasks()
    deleteAllList.classList.add('d-none')
    searchInput.classList.add('d-none')
}

