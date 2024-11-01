const PRIORITY = {
   LOW: 1,
   MEDIUM: 3,
   HIGH: 5,
   URGENT: 7 };


function validInteger (value) { // value can be a string or a number (integer)
  if (typeof value === 'string') {
     const valueInteger = parseInt(value,10); //converts string to integer using base10
     return valueInteger >= 0 && valueInteger.toString() === value; // checks if it is non-negative, checks it matches value 
  }
  return Number.isInteger(value) && value >= 0; //integer and non negative 
}  


function validatePriority(priority) { // value can be a string or a number (integer)
  const validPriorities = new Set([1,3,5,7]); //defines valid options for lookup
  const priorityNumber= Number.isInteger(priority) ? priority : parseInt(priority, 10); //convert to num if needed
  return validPriorities.has(priorityNumber) ? priorityNumber : 1; // 
}


function todaysDate () {
  const now = new Date(); //get current date and time
   
  return [
    now.getDate().toString().padStart(2, '0'),  // Day
    (now.getMonth() + 1).toString().padStart(2, '0'), // Month (0-based)
    now.getFullYear(), // Year
    now.getHours().toString().padStart(2, '0'), // Hours
    now.getMinutes().toString().padStart(2, '0'), // Minutes
    now.getSeconds().toString().padStart(2, '0') // Seconds
  ].reduce((dateTime, value, index) => {
    if (index < 3) { // Date part
        return dateTime + value + (index === 2 ? ' ' : '/'); // Add space after year
    } else { // Time part
        return dateTime + value + (index === 5 ? '' : ':'); // No colon after seconds
    }
  }, '');
}


class Task  {
  constructor(title, priority) {
    this._title = title; //priv
    this._priority = validatePriority(priority);
    this._added = todaysDate();
  }

  get title() { //getter for title, r only access
    return this._title;
  }

  get added() { //getter for added
    return this._added;
  }

  get priority() { //getter priority
    return this._priority;
  }

  set priority(value) { //setter for priority  
    this._priority = validatePriority(value);
  }
}


class ToDo {
  constructor() {
    this.tasks = new Map();
  }
  
  add(task) {
    const taskTitle = task.title.toLowerCase();
    if (this.tasks.has(taskTitle)) {
      throw new Error(`Task '${task.title}' already exists`);
    }
    this.tasks.set(taskTitle, task);
    return this.tasks.size;
}

remove(title) {
  const taskTitle = title.toLowerCase();
  return this.tasks.delete(taskTitle);
}

list(priority = 0) {
  return Array.from(this.tasks.values())
  .filter(task => priority === 0 || task.priority === priority)
  .map(task => [task.added, task.title, task.priority]);
}

task(title) { 
  const taskTitle = title.toLowerCase();
  const foundTask = this.tasks.get(taskTitle);
  if (!foundTask) throw new Error(`Task '${title}' Not Found`); 
  return foundTask;
  }
  
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}