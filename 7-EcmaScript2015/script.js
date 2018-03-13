// Lecture 1 Vars vs Let and Const

// ES5
/*
var name5 = 'james smith';
var age5 = 25;
name5 = 'Jane Miller';
console.log(name5);

// ES6

const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jame Miller';
console.log(name6);
*/

/*
// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John Doe';
        var yearOfBirth = 1995;


    }
    console.log(firstName + ' was born in ' + yearOfBirth);
}

driversLicense5(true);

//ES6
function driversLicense6(passedTest) {
    let firstName;
    const yearOfBirth = 1995;
    if (passedTest) {
        firstName = 'John Doe';
    }
    console.log(firstName + ' was born in ' + yearOfBirth);
}

driversLicense6(true);
*/

// Lecture Blocks and IIFEs

/*
//ES6

{
    let a = 1;
    const b = 2;
    var c = 3;
}

console.log(c);

//ES5
(function () {
    var c = 3;
})();
*/

/*
// Lecture Strings ES6

let firstName = 'John';
let lastName = 'Smith';

const yearOfBirth = 1990;

function calculateAge(year) {
    return 2016 - year;
}

// ES5 

console.log('This is ' + firstName + ' ' + lastName + ' He Was Born in ' + calculateAge(yearOfBirth) + ' years');

// ES6

console.log(`This is ${firstName} ${lastName} He Was Born in ${calculateAge(yearOfBirth)} years `);

const n = `${firstName} ${lastName} `;

console.log(n.startsWith('j'));
console.log(n.startsWith('J'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(n.repeat(5));
*/

// Lecture Arrow Functions

/*
const years = [1990, 1967, 1992, 1937];

// ES5

const ages5 = years.map(function (cur) {
    return 2016 - cur;
});

console.log(ages5);

//ES6

let ages6 = years.map((cur) => {
    return 2016 - cur;
});

console.log(ages6);

ages6 = years.map((cur, index) => {
    return `Age element ${index} : ${cur}`;
});

console.log(ages6);
*/

// Lecture Arrow Functions Lexical This
/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            console.log(this);
            console.log(box5);
            var str = "This box number " + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }

}

box5.clickMe();

// ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            console.log(this);
            console.log(box6);
            var str = "This box is number " + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }

}

//box6.clickMe();
*/


// Lecture Destructuring

/*
//ES5
var john = ['john', 25];

var name = john[0];
var age = john[1];

//ES6

const [name, year] = john;

console.log(name);
console.log(year);

function calcRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retireYear] = calcRetirement(1990);
console.log(age2);
console.log(retireYear);
*/

// Lecture Spreading Operator

/*
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 19, 20, 21);
console.log(sum1);

// ES5

var ages = [18, 19, 20, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6

const sum3 = addFourAges(...ages);
console.log(sum3);

const smithFamily = ['jack', 'daniel', 'rob'];
const millerFamily = ['Leo', 'Smooth-H', 'Smooch'];

const bigFamily = [...smithFamily, ...millerFamily];
console.log(bigFamily);

*/
// Lecture Rest Parameters
/*
//ES5
function isFullAge5(limit) {
    console.log(arguments);
    var arry = Array.prototype.slice.call(arguments, 1);

    arry.forEach(function (el, index) {
        console.log((2016 - el) >= limit);
    });

}

isFullAge5(21, 1990, 1999, 1996);

//ES6

function isFullAge6(limit, ...years) {
    console.log(years);
    for (var year of years) {
        console.log((2016 - year) >= limit);
    }
}
isFullAge6(18, 1990, 1999, 1996);

*/

/*
const question = new Map();

question.set('question', 'what is the offical name of modern javascript');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Winner winner chicken dinner');
question.set(false, 'You loser');

console.log(question.get('question'));
for (var i = 1; i < 5; i++)
    console.log(question.get(i));

question.forEach((value, key) => {
    console.log(`The Key ${key} and the value ${value}`);
});
*/
/*
for (var [key, val] of question.entries()) {
    if (typeof (key) === 'number') {
        console.log(`Answer ${key} : ${val}`);
    }
}

var ans = parseInt(prompt('Write the Correct Answer'));

if (question.get('correct') === ans) {
    console.log(question.get(true));
} else {
    console.log(question.get(false));
}
*/

/*
//Lecture Classes

var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('john', 1990, 'teacher');
console.log(john5);

class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static Greeting() {
        console.log('hey there');
    }
}

const john6 = new Person6('john', 1991, 'Designer');
console.log(john6);
Person6.Greeting();
*/

// Lecture Classes and subClasses

// ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
}
var JohnAthlete5 = new Athlete5('John', 1990, 'Swimmer', 3, 10);
console.log(JohnAthlete5);
JohnAthlete5.calculateAge();
JohnAthlete5.wonMedal();

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {

    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }

}