// Factory Function

// function personMaker(name, age) {
//   const person = {
//     name: name,
//     age: age,
//     talk() {
//       console.log(`Hi! my name is ${this.name}`);
//     },
//   };
//   return person;
// }

// Constructor - doesn't return anything & start with capital letter

// function Person(name, age) {
//   (this.name = name), (this.age = age);
// }

// Person.prototype.talk = function () {
//   console.log(`Hi , my name is ${this.name}`);
// };

// classes

class Person {
  // base class / parent class
  constructor(name, age) {
    (this.name = name), (this.age = age);
  }
  talk() {
    console.log(`Hi , my name is ${name}`);
  }
}

class Student extends Person {
  constructor(name, age, marks) {
    super(name, age); // parent class constructor is being called
    this.marks = marks;
  }
  talk() {
    console.log(`${this.name} is a cool dood:`);
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
}

let s1 = new Student("Asish", 21, 97);
// let t1 = new Teacher("Rohit", 53, "Math");
