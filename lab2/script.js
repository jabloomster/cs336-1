/**
 * Lab 2
 *

Prototype-based languages can implement inheritance and polymorphism as well.
------------------------------------------
Exercise 2.2
Build an object prototype for a student inherits the features of the person 
class and adds the following.
-a subject of study
-printing a greeting (e.g., “I’m a student”)

Add some code to test your new child prototype, e.g., 
create some instances, check the sub-classing using the
 instanceof operator and demonstrate the inherited/polymorphic methods.
-------------------------------------------------------------

 * @author jlm54 
 * 
 * 8/16/2016
 */

 //person first class object
 function Person(name, birthdate) {
 	this.name = name;
 	this.birthdate = birthdate;
 	this.friendList = [];
 };

 //inherits Person
 function Student(name, birthdate, major) {
 	Person.call(this, name, birthdate);
 	this.major = major;
 };

 // mutator for Person name
 Person.prototype.rename = function(newName) {
 	this.name = newName;
 };

 //Prints Person greeting
 Person.prototype.hello = function() {
 	return  "Hi, my name is " + this.name + "!";
 };

 //prints student greeting
 Student.prototype.hello = function() {
 	return "Hi, my name is " + this.name + ", and I'm studying " + this.major + "!";
 };

 //Returns Age after calling calcAge function
 Person.prototype.getAge = function() {
 	return this.name + " age = " + calcAge(this.birthdate);
 };

 //add friend (person object) to person.friendList
 Person.prototype.addFriend = function(friend) {
 	this.friendList.push(friend);
 };

 // Lists friends in friendlist
 Person.prototype.listFriends = function() {
 	console.log("Friends of " + ' ' + this.name + ": \n");
 	for (var i = this.friendList.length - 1; i >= 0; i--) {
 		console.log(this.friendList[i].name + "\n");
 	}
 };

//taken from http://jsfiddle.net/codeandcloud/n33RJ/
//Calculates age based on birthdate month/day/year ex 01/01/1990
function calcAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

//testing person
let p1 = new Person("Marvin", "01/01/1930");
let p2 = new Person("Koffina", "07/11/2016");
let p3 = new Person("Josh", "07/11/2016");
let p4 = new Person("Jake", "07/11/2016");
console.log(p1);
p1.rename("Marvin Jr.");
console.log(p1);
console.log(p2);
console.log(p1.getAge());
p1.addFriend(p2);
p1.addFriend(p3);
p1.addFriend(p4);
console.log(p1.hello());
console.log(p1.friendList[0].name);
console.log(p1.friendList[1].name);
console.log(p1.friendList[2].name);
p1.listFriends();
console.log("\n");
//testing student
let s1 = new Student("Mac", "05/08/1978", "Business");
console.log(s1);
console.log(s1.hello());
console.log(p1.hello());
//testing enheritism
console.log(s1 instanceof Person);
console.log(s1 instanceof Student);
console.log(p1 instanceof Person);
console.log(p1 instanceof Student);