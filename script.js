'use stict';

let tasks = [];

const newTask = document.querySelector('#newtask'),
    addTask = document.querySelector('#addtask'),
    allTasks = document.querySelector('.todo-list__body'),
    countTasks = document.querySelector(".todo-list__footer");

    function tasksCount(){
      if(tasks == ""){
         countTasks.innerHTML = '<p class="todo-list__footer-placeholder">На данный момент список задач пуст &#128528</p>';
      } else {
         countTasks.innerHTML = `<p class="todo-list__footer-placeholder">Вам осталось решить задач: ${tasks.length}!</p>`;
      }
   }
   
   function saveTasks() {
      localStorage.setItem('savedTasks', JSON.stringify(tasks));
   }
   
   function countAndSave () {
      tasksCount();
      saveTasks();
   }

    if(localStorage.getItem('savedTasks')) {
      tasks = JSON.parse((localStorage.getItem('savedTasks')));
      tasks.forEach((item) => {
         allTasks.innerHTML += `
         <div class="todo-list__body-itm">
            <div class="todo-list__body-itm-text">
               ${item}
            </div>
            <button class="todo-list__body-itm-del"><div class="minus"></div></button>
         </div>
         `;
         newTask.value = "";
         countAndSave();
      });
   }

addTask.addEventListener(
   'click',
   (e) => {
      if(newTask.value === "") {
         alert("Введите новую задачу!");
      } else {
         tasks.push(newTask.value);
         allTasks.innerHTML += `
         <div class="todo-list__body-itm">
            <div class="todo-list__body-itm-text">
               ${newTask.value}
            </div>
            <button class="todo-list__body-itm-del"><div class="minus"></div></button>
         </div>
         `;
         newTask.value = "";
         countAndSave();
      }
   }
);

// НАЙДИ ЗАМЕНУ КОСТЫЛЮ!

allTasks.addEventListener(
   'click',
   (e) => {
      if(e.target && e.target.matches('button.todo-list__body-itm-del')){
         let txt = e.target.previousElementSibling.innerHTML;
         tasks.splice(tasks.indexOf("txt"),1);
         e.target.parentElement.remove();
         countAndSave();
      }
      if(e.target && e.target.matches('div.minus')){
         let txt = e.target.parentElement.previousElementSibling.innerHTML;
         tasks.splice(tasks.indexOf("txt"),1);
         e.target.parentElement.parentElement.remove();
         countAndSave();
      }
   }
);