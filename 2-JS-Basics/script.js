/*
var firstName = 'Gino';
console.log(name);
var lastName = 'Sahagun';
console.log(firstName + lastName);
var age = 24;
console.log(age);
var fullAge = true;
console.log(fullAge);
*/

/*
var name = 'Gino';
var age = 24;

var job, isMarried;

// undefined behavior because it hasn't been inialized
console.log(job);

job = 'Teacher';
isMarried = false;

console.log(name + ' is a ' + age + ' old ' + job + ' and is he married? ' + isMarried);
*/

/*
 CODING CHALLENGE 01 

 Find the Sum of both friends and or third friend from their ages and heights. These will be static variables and calculate the winner. Height is in Centimeters

*/
/*
var height = (Math.random() * 150 ) + 100;
var height1 = (Math.random() * 150 ) + 100;
var height2 = (Math.random() * 150 ) + 100;
var age = (Math.random() * 100 ) + 5;
var age1 = (Math.random() * 100 ) + 5;
var age2 = (Math.random() * 100 ) + 5;

var score = height + age;
var score1 = height1 + score1;
var score2 = height2 + score2;

if (score > score1 && score > score2)
    console.log("Zack Wins the Game with" + score);
else if (score1 > score && score1 > score2)
    console.log("Mary wins with the score" + score1);
else if (score2 > score && score2 > score1)
    console.log("Bob Wins with " + score2);
else if (score > score1 && score === score2)
    console.log("Zack and Mary Win with scores " + score + ' ' + score2)
else if (score === score1 && score > score2)
    console.log("Bob and Zack Win with scores " + score +  ' ' + score1);
else 
    console.log("Everyone Wins with scores " + score +  ' ' + score1 + ' ' + score2);


*/

// Lecture on Functions
function calculateAge (year)
{
  return (2016 - year);
}
function retirementYear(name, year)
{
  var age = calculateAge(year);
  var retirement = 65 - age;
  console.log(name + " retires in " + retirement + ' years');
}

// Lecture on Arrays

var nums = [1,2,6,9,9,5];

var numbers = [];

for (var i = 1; i <= 10; i++)
    numbers.push(i);

// Lecture Objects and Properties

// Object John
var john = {
    firstName : 'John',
    lastName : 'Ray',
    birthYear : 27,
    job : 'Teacher',
    isMarried : false
};

console.log(john.lastName);
console.log(john['lastName']);
var xyz = 'job';
console.log(john[xyz]);

//john.firstName = 'Bob';

//Jane Object
var jane = new Object();
jane.firstName = 'billy';
jane['job'] = "Programmer";



// Lecture Objects and Methods

// Object John
var john = {
    firstName : 'John',
    lastName : 'Ray',
    birthYear : 27,
    job : 'Teacher',
    isMarried : false,
    calcualteAge : () => {
        this.age = 2016 - this.birthYear;
    }
};

console.log(john.age);

// Code Challenge 2

function printFullAge (years)
{
    var fullAge = [];
    for (var year in years){
        if ((2016 - year) >= 18)
            fullAge.push(true);
        else
            fullAge.push(false);
    }

    return fullAge;
}


var years = [];

for (var i = 0;i < 5; i++)
    years.push((Math.random() * 2016)+ 1965);

var full_age = printFullAge(years);
console.log(full_age);




