// Function Constructor
/*
var john = {
    name : 'john',
    yearOfBirth : "1990",
    job : 'teacher'
};

var Person = function(name, year, job)
{
    this.name = name;
    this.yearOfBirth = year;
    this.job = job;
}

Person.prototype.calculateAge = function(){
    var date = new Date();
    this.age = (date.getUTCFullYear()) - this.yearOfBirth;
    console.log(this.age);
};
Person.prototype.lastName = 'Smith';
john = new Person('john', 1990, 'teacher');
console.log(john);
john.calculateAge();
console.log(john.lastName);
*/

// Object.Create()
/*
var personProto = {
    calculateAge : function(){
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
console.log(john);

var jane = Object.create(personProto, {
    name : {value: 'Jane'},
    yearOfBirth : {value: 1990},
    job : {value: 'Designer'}
});

console.log(jane);
*/

// Primitives VS Objects

/*
var a = 23;
var b = a;
a= 46;
console.log(a);
console.log(b);

var obj1 = {
    name : 'John',
    yearOfBirth : 1990
};
// Obj2 makes a shallow copy of Obj 1
// Making Obj2 point to Obj1's Memory Address 
var obj2 = obj1;

obj1.age = 30;
console.log(obj2.age);
console.log(obj1.age);

var age = 27;
var obj = {
    name : 'John',
    city : 'Lisbon'
};

//Objects are Passed By Reference and Primitives are Passed by Value
function change(a,b)
{
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj);
*/

// Lecture Passing Functions as Arguments

var years = [1990,1991,1992,1993];

function arrayCal(arr, fn){
    var res = [];
    for (var num of arr)
    {
        res.push(fn(num));
    }

    return res;


}

function calculateAge(el){
    return 2016 - el;
}

function isFullAge(limit, el)
{
    return el >= limit;
}

//console.log(arrayCal(years, calculateAge));

var ages = arrayCal(years, calculateAge);
var fullJapan = arrayCal(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);



// Lecture Functions returning Functions

/*
function interviewQuestions(job)
{
    if (job === 'designer'){
        return function (name){
            console.log(name + ' can you explain what UX is?')
        }
    }
    else if (job === 'teacher')
    {
        return function (name){
            console.log(name + ' What Subject do you Teach?')
        }
    }
    else
    {
        return function (name){
            console.log(name + ' What do you do?')
        }
    }
}

var teacherQuestion = interviewQuestions('teacher');

teacherQuestion('John');

interviewQuestions('milkman')('Mark');
*/

// Lecture Immediatly invoked Function Expression
/*
function game(){
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();
*/
/*
(function (){
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//console.log(score);

(function (goodluck){
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})(5)
*/

// Lecture Closures 
/*
function retirement(retirementAge)
{
    var a = ' years left until retirement';
    return function(yearOfBirth)
    {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(65);
var retirementGermany = retirement(66);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

function interviewQuestions(job)
{
    return function(name)
    {
        if (job === 'designer'){
            console.log(name + ' can you explain what UX is?')
        }
        else if (job === 'teacher')
        {
            console.log(name + ' What Subject do you Teach?')
        }
        else
        {
            console.log(name + ' What do you do?')
        }
    }
}
*/

// Lecture Bind, Call, Apply

var john = {
    name : 'John',
    age : 28,
    job : 'teacher',
    presentation : function (style, timeOfDay)
    {
        if (style === 'friendly')
        {
            console.log('Hey What\'s up ' + timeOfDay 
            + " Gents and ladies I\'m " + this.name + ' I\'m a ' + this.job + 'and I\'m ' + this.age);
        }
        else if (style === 'formal')
        {
            console.log("Good " + timeOfDay 
            + " Gents and ladies I\'m " + this.name + ' I\'m a ' + this.job + 'and I\'m ' + this.age);
        }
    }
}

var emily = {
    name : 'Emily',
    age : 28,
    job : 'designer'
}

john.presentation('friendly', 'Morning');
john.presentation.call(emily, 'friendly', 'Morning');

//john.presentation.apply(emily, ['friendly', 'Morning']);

var johnFriendly = john.presentation.bind(john,'friendly');

johnFriendly('Morning');
