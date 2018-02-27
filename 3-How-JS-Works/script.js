///////////////////////////////////////
// Lecture: Hoisting
/*
//Functions 
calculateAge(1965);
function calculateAge(year = 1996)
{
    console.log(2016 - year);
}



//retirement(1965);
var retirement = (year) => {
    var age = calculateAge(year);
    return 65 - age;
}

//Variables

console.log(age); //undefined

var age = 65;

function foo()
{
    console.log(age);
    var age = 25;
    console.log(age);
}
foo();
console.log(age);


*/







///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
//first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

function third()
{
    var d = "John";
    first();
    //console.log(c);
}
third();
*/
// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//console.log(this);
//calculateAge(1990);
function calculateAge(year)
{
    console.log(2016-year);
    console.log(this);
}

var john = {
    name : "John Elway",
    yearOfBirth : 1995,
    calculateAge : function () {
    
        console.log(2016 - this.yearOfBirth);

        // John Object Lexical
        var inner = () => {
            console.log(this);
        }
        inner();
        //Window Object 
        function innerFunction(){
            console.log(this); //Window Object
        }
        innerFunction();
    }
};

john.calculateAge();

var mike = {
    name : "Mike Wizouski",
    yearOfBirth : 1985
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();