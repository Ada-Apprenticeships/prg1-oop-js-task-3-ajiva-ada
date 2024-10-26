PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


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
  
}


class Task  {

  // (title, priority)
}


class ToDo {
    
}








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}