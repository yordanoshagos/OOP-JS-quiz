// 1. Create a CustomerOrder class with properties: orderId (string), items (array of objects with name, quantity, price), and status (string). Add a method 
// calculateTotal() that returns the total order amount. Write an async method processPayment() that simulates payment with a Promise that resolves after 2 seconds. 
// After calling the method, change the status to "paid" and print a success message.

class CustomerOrder{
    constructor(orderId, items, status){
        this.orderId = orderId
        this.items = items
        this.status = status
    }

    calculateTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0 );
    }

    async processPayment() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.status = "paid";
    console.log(`Payment successful for order ${this.orderId}. Status: ${this.status}`);
  }

}

const firstCustomer = new CustomerOrder("C01", [{ name: "Laptop", quantity: 3, price: 1200 }, { name: "Mouse", quantity: 1, price: 25}, {name: "ram", quantity: 5, price: 1500}], "New and High quality");
console.log(firstCustomer);
console.log(firstCustomer.calculateTotal()); 
firstCustomer.processPayment().then(() => {
    console.log('Payment process finished.');
});

// 2. Create a TeamMember class that takes name, role, and an array of tasks (each task is an object with title and completed boolean). Write a prototype method 
// completeTask(taskTitle) that marks a task as completed. Write another method checkProgress() that returns a Promise resolving to "All tasks completed!" or 
// rejecting with "Pending tasks remaining" based on the state of the tasks array.

class TeamMember {
  constructor(name, role, arrTasks) {
    this.name = name;
    this.role = role;
    this.arrTasks = arrTasks;
  }
}

TeamMember.prototype.completeTask = function (taskTitle) {
  for (let i = 0; i < this.arrTasks.length; i++) {
    if (this.arrTasks[i].title === taskTitle) {
      this.arrTasks[i].completed = true;
      break; 
    }
  }
};

TeamMember.prototype.checkProgress = function () {
  return new Promise((resolve, reject) => {
    const allDone = this.arrTasks.every((tsk) => tsk.completed);
    setTimeout(() => {
      if (allDone) {
        resolve("All tasks completed!");
      } else {
        reject("Pending tasks remaining");
      }
    }, 0);
  });
};

const member1 = new TeamMember("Dawit", "Developer", [
  { title: "Write code", completed: false },
  { title: "Test app", completed: false }
]);

console.log("Before:", member1.arrTasks);
member1.completeTask("Write code");
console.log("After:", member1.arrTasks);

member1.checkProgress()
  .then(message => console.log("Progress:", message))
  .catch(error => console.log("Progress:", error));

member1.completeTask("Test app");

member1.checkProgress()
  .then(message => console.log("Progress after finishing all:", message))
  .catch(error => console.log("Progress after finishing all:", error));

// 3. Build a Candidate class with properties: name, position, and interviews (array of objects with date, status). Add a method scheduleInterview(date) that pushes 
// a new interview with status "pending". Then write an async function sendConfirmation() that returns a Promise that resolves after 1 second with a message "Interview 
// confirmed with [name]", and log the message.

class Candidate{
    constructor(name, position, interviews){
        this.name = name
        this.position = position
        this.interviews = interviews
    }
    scheduleInterview(date){
        this.interviews.push({ date, status: "pending" })
    }
    async sendConfirmation() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let message = `Interview confirmed with ${this.name}`
                console.log(message)
                resolve(message)
            }, 1000)
        })
    }
}

let candidate1 = new Candidate('Yordanos', 'Florist', [{date: '2024-08-10', status: 'Completed'}])
candidate1.scheduleInterview('2024-05-14');
candidate1.sendConfirmation()

// 4. Design a Course class with properties: title, instructor, and students (array of student objects with name and progress). Add a method 
// updateProgress(studentName, value) that modifies the student’s progress. Create an async method generateCertificate(studentName) that returns a Promise resolving 
// only if the progress is 100, otherwise reject with "Incomplete progress".

class Course{
    constructor(title, instructor, students){
        this.title = title
        this.instructor = instructor
        this.students = students
    }
    updateProgress(studentName, value){
        this.students = this.students.map(student => {
            if (student.name === studentName){
                return { ...student, progress: value };
            }
            return student;
        });
        return this.students
    }

async generateCertificate(studentName) {
        let certificateMessage = "Incomplete progress";
        this.students.map(student => {
            if (student.name === studentName && student.progress === 100) {
                certificateMessage = `Certificate generated for ${studentName}`;
            }
        });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (certificateMessage.startsWith("Certificate")) {
                    resolve(certificateMessage);
                } else {
                    reject(certificateMessage);
                }
            }, 0);
        });
    }
}

const jsCourse = new Course("JavaScript","Hunter", [{ name: "Abel", progress: 90 }, { name: "Sara", progress: 100 }, { name: "Liya", progress: 60 }]);

console.log("Before:", jsCourse.students);
jsCourse.updateProgress("Abel", 100);
console.log("After:", jsCourse.students);

jsCourse.generateCertificate("Abel")
    .then(msg => console.log("Abel:", msg))
    .catch(err => console.log("Abel:", err));
jsCourse.generateCertificate("Liya")
    .then(msg => console.log("Liya:", msg))
    .catch(err => console.log("Liya:", err));



//  5. Create a StockTracker class with a property watchlist (array of objects with symbol, threshold, currentPrice). Add a method updatePrice(symbol, newPrice) that updates the stock’s current price. Write an async method checkAlerts() that loops through the watchlist and returns a Promise resolving with a list of stocks where currentPrice >= threshold, or rejecting with "No alerts triggered".

class StockTracker{
    constructor(watchList=[]){
        this.watchList= watchList
    }
updatePrice(symbol, newPrice) {
    this.watchList = this.watchList.map(item => {
        if (item.symbol === symbol) {
            return { ...item, currentPrice: newPrice };
        }
        return item;
    });
}
    async checkAlerts(){
        return new Promise((resolve,reject)=>{
            const triggered= this.watchList.filter(stock=> stock.currentPrice>= stock.threshold)
            if (triggered.length>0){
                resolve(triggered);
            }
            else{
                reject("No triggered alerts")
            }
        })
    }
}
let tracker= new StockTracker([{symbol: "KG", threshold: 100, currentPrice: 125},
    {symbol:"BC", threshold:150, currentPrice:1500}
])
tracker.updatePrice("KG", 250);
tracker.checkAlerts()
    .then(alerts => console.log(alerts))
    .catch(message => console.log(message));






