//Code Challenge Section 7

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'medium');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        //console.log(classification);
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} `);
    }
}
class Park extends Element {
    constructor(name, buildYear, area, numTree) {
        super(name, buildYear);
        this.area = area;
        this.numTree = numTree;
        this.age = new Date().getFullYear() - buildYear;
    }

    treeDensity() {
        const density = this.numTree / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square per km.`);
    }

}

const parks = [
    new Park('Green Park', 1987, 0.2, 215),
    new Park('National Park', 1894, 2.9, 3541),
    new Park('Oak Park', 1953, 0.4, 949)
];

const streets = [
    new Street('Ocean Avenue', 1987, 1.1, 4),
    new Street('Park Drive', 1894, 2.7, 2),
    new Street('Cool Place', 1953, 0.8, 3),
    new Street('Eternal Drive', 1953, 2.5, 5)
];

function calculateAge(arr) {
    const sum = arr.reduce((prev, cur, index) => {
        prev + cur,
        0;
    });
    return [
        sum, sum / arr.length
    ]
}

function ReportParks(p) {

    console.log('----PARKS REPORT-----');
    p.forEach(el => {
        el.treeDensity();
    });

    const [totalAge,
        avgAge] = calculateAge(p.map(el => new Date().getFullYear() - el.buildYear));

    console.log(`Our Parks have an average age of ${p.length}`);

    const i = p
        .map(el => el.numTree)
        .findIndex(el => el >= 1000);

    console.log(`${p[i].name} has more than 1000 trees`);

}

function ReportStreets(s) {
    console.log('----STREET REPORT-----');
    const [totalLength,
        avgLength] = calculateAge(s.map(el => el.length));

    console.log(`Our ${s.length} streets has an average length of ${avgLength} and a total length of ${totalLength}`);

    s.forEach(el => {
        el.classifyStreet();
    })

}

ReportParks(parks);
ReportStreets(streets);