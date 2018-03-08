/* TEST Stuff
// Budget Controller and handles...
var BudgetController = (function() {
    var x = 23;

    var add = function (a)
    {
        return x + a;
    }

    return {
        publicTest : function (b){
           return add(b);
        }
    }

})();

//UI Controller handles UI Display Features and models...
var UIController = (function(){

    var date = document.querySelector('.budget__title--month');
    var incomeVal = document.querySelector('.budget__income--value');
    var expenseVal = document.querySelector('.budget__expense--value');

    var GetInputValue = function () {

    }

    var AddNewItem = function (value, sign)
    {

    }

    var UpdateUI = function (){

    }

    return {

    }

})();

// APP Controller Connects the Budget Controller and User Interface to talk with one another
var AppController = (function(budgetCtrl, userInterfaceCtrl){

    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function(){
            console.log(z);
        }
    }


})(BudgetController, UIController);

*/

// Budget Controller and handles...
var BudgetController = (function () {

    //TODO CODE
    var Expense = function (id, value, description) {
        this.id = id;
        this.value = value;
        this.description = description;
        this.percentage = -1;
    }
    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }
    var Income = function (id, value, description) {
        this.id = id;
        this.value = value;
        this.description = description;
    }

    var calculateTotal = function (type) {
        var sum = 0;

        for (var current of budgetModel.allItems[type]) 
            sum += current.value;
        budgetModel.balance[type] = sum;

    };

    var budgetModel = {
        allItems: {
            exp: [],
            inc: []
        },
        balance: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        getBudget: function () {
            return {totals: budgetModel.balance, budget: budgetModel.budget, percentage: budgetModel.percentage}
        },
        getPercentages: function () {
            var allItems = budgetModel
                .allItems
                .exp
                .map(function (item) {
                    return item.getPercentage();
                });
            return allItems;
        },
        calculateBudget: function () {
            // 1. calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // 2. calculate balance totalincome - totalexpenses
            budgetModel.budget = budgetModel.balance.inc - budgetModel.balance.exp;

            // 3. calculate total percentage of income spent
            if (budgetModel.balance.inc > 0) {
                budgetModel.percentage = Math.round((budgetModel.balance.exp / budgetModel.balance.inc) * 100);
            } else {
                budgetModel.percentage = -1;
            }
        },
        calculatePercentages: function () {
            // 1. Calculate each Percentages in the expense
            budgetModel
                .allItems
                .exp
                .forEach(function (current) {
                    current.calculatePercentage(budgetModel.balance.inc);
                });
        },
        AddItem: function (type, desc, val) {
            var newItem,
                ID;

            // Create ID

            if (budgetModel.allItems[type].length > 0) 
                ID = budgetModel.allItems[type][budgetModel.allItems[type].length - 1].id + 1;
            else 
                ID = 0;
            
            //Create new Item
            if (type === 'exp') {
                newItem = new Expense(ID, val, desc);
            } else {
                newItem = new Income(ID, val, desc);
            }

            //add new Item to our Budget Model
            budgetModel
                .allItems[type]
                .push(newItem);

            //Return new Item to use it within our APP Controller
            return newItem;

        },
        DeleteItem: function (type, id) {
            /*
            var ids,
                index;
            ids = budgetModel
                .allItems[type]
                .map(function (item) {
                    return item.id;
                });
            index = ids.indexOf(id);
            if (index >= 0) {
                budgetModel
                    .allItems[type]
                    .splice(index, 1);
            }*/
            budgetModel.allItems[type] = budgetModel
                .allItems[type]
                .filter(function (item) {
                    if (item.id !== id) 
                        return item;
                    }
                )

        },
        test: function () {
            console.log(budgetModel);
        }
    }

})();

//UI Controller handles UI Display Features and models...
var UIController = (function () {
    //TODO CODE

    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputVal: '.add__value',
        inputBtn: '.add__btn',
        Container: '.container',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        PercentLabel: '.budget__expenses--percentage',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var FormatNumber = function (num, type) {

        var numSplit,
            integer,
            decimal;
        // 1. + or - before the number
        // 2. two decimal points
        // 3. commas for thousands ex. 2342.1235 -> + 2,342.12

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        integer = numSplit[0];
        decimal = numSplit[1];

        var addCommas = function (val) {
            var newVal = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            console.log(newVal);
            return newVal;
        };
        integer = addCommas(integer);
        return (type === 'exp'
            ? '-'
            : '+') + ' ' + integer + '.' + decimal;

    };
    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        GetInput: function () {
            return {
                // signed value is inc === Increase OR exp === Expense
                type: document
                    .querySelector(DOMstrings.inputType)
                    .value,
                // item description
                description: document
                    .querySelector(DOMstrings.inputDesc)
                    .value,
                // item value
                value: parseFloat(document.querySelector(DOMstrings.inputVal).value)
            }
        },
        GetDomStrings: function () {
            return DOMstrings;

        },
        changedType: function () {
            var fields,
                btn;
            fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputDesc + ',' + DOMstrings.inputVal);

            nodeListForEach(fields, function (field, index) {
                field
                    .classList
                    .toggle('red-focus');
            });

            btn = document.querySelector(DOMstrings.inputBtn);
            btn
                .classList
                .toggle('red');

        },
        ClearFields: function () {
            // Query for add__description + add__value
            var fields = document.querySelectorAll(DOMstrings.inputDesc + ', ' + DOMstrings.inputVal);

            /* Different Way of converting a list into an array and then using for
            each loop to access each element to reset it to an empty string
            fieldsArr = Array
                .prototype
                .slice
                .call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            */

            // Loop through each field to set it to an empty field
            for (var field of fields) {
                field.value = "";
            }
            fields[0].focus();

        },
        DisplayBudget: function (obj) {
            //Display Budget, Inc, Exp and Exp Percentage

            var type;

            type = obj.budget > 0
                ? 'inc'
                : 'exp';

            document
                .querySelector(DOMstrings.budgetLabel)
                .textContent = FormatNumber(obj.budget, type);
            document
                .querySelector(DOMstrings.incomeLabel)
                .textContent = FormatNumber(obj.totals.inc, 'inc');
            document
                .querySelector(DOMstrings.expenseLabel)
                .textContent = FormatNumber(obj.totals.exp, 'exp');
            document
                .querySelector(DOMstrings.PercentLabel)
                .textContent = obj.percentage;

            if (obj.percentage > 0) {
                document
                    .querySelector(DOMstrings.PercentLabel)
                    .textContent = obj.percentage + '%';
            } else {
                document
                    .querySelector(DOMstrings.PercentLabel)
                    .textContent = '---';
            }

        },
        DisplayPercentages: function (percentages) {
            var labels = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(labels, function (label, index) {
                if (percentages[index] > 0) {
                    label.textContent = percentages[index] + '%';
                } else {
                    label.textContent = '---';
                }
            });

            /*
            for (var i = 0; i < labels.length; i++) {
                labels[i].value = percentages[i];
            }
            */
        },
        DisplayDate: function () {
            var now,
                month,
                year,
                months;

            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            months = [
                'January',
                'Feburary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            document
                .querySelector(DOMstrings.dateLabel)
                .textContent = months[month] + ' ' + year;

        },
        AddListItem: function (obj, type) {
            // 1. Create HTML String with placeHolder Text
            var html,
                newHtml,
                container;
            if (type === 'inc') {
                container = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descrip' +
                        'tion%</div><div class="right clearfix"> <div class="item__value">%value%</div><d' +
                        'iv class="item__delete"><button class="item__delete--btn"><i class="ion-ios-clos' +
                        'e-outline"></i></button></div></div></div>'
            } else {
                container = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%descrip' +
                        'tion%</div><div class="right clearfix"><div class="item__value">%value%</div><di' +
                        'v class="item__percentage">21%</div><div class="item__delete"><button class="ite' +
                        'm__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // 2. Replace placeHolder string with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', FormatNumber(obj.value, type));
            // 3. insert html into DOM
            document
                .querySelector(container)
                .insertAdjacentHTML('beforeend', newHtml);

        },
        DeleteListItem: function (selectorID) {
            var elem = document.getElementById(selectorID);
            elem
                .parentNode
                .removeChild(elem);
        }
    }

})();

// APP Controller Connects the Budget Controller and User Interface to talk with
// one another
var AppController = (function (budgetCtrl, userInterfaceCtrl) {

    var setupEventListeners = function () {
        let DOM = userInterfaceCtrl.GetDomStrings();
        document
            .querySelector(DOM.inputBtn)
            .addEventListener('click', ctrlAddItem);

        document
            .querySelector(DOM.inputBtn)
            .addEventListener('keypress', function (event) {
                event.preventDefault();
                if (event.keyCode === 13 || event.which === 13) {
                    ctrlAddItem();
                }
            });

        document
            .querySelector(DOM.Container)
            .addEventListener('click', ctrlDeleteItem)

        document
            .querySelector(DOM.inputType)
            .addEventListener('change', userInterfaceCtrl.changedType)
    };

    var ctrlDeleteItem = function (event) {
        var itemID,
            splitID,
            type,
            ID;
        // 1. Get Deleted Item ID
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            //"inc-0"
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // 2. Delete Item from Budget Controller
            budgetCtrl.DeleteItem(type, ID);

            // 3. Delete Item From UI Controller
            userInterfaceCtrl.DeleteListItem(itemID);
            // 4. Recalculate Budget
            updateBudget();
            // 5. Calculate and Update Percentages
            updatePercentages();
        }

    }

    var updateBudget = function () {

        // 1. Calculate Budget
        budgetCtrl.calculateBudget();
        // 2. Return the Budget
        var budget = budgetCtrl.getBudget();
        // 3. Display Budget on UI};
        userInterfaceCtrl.DisplayBudget(budget);
    };
    var updatePercentages = function () {

        // 1. Calculate Percentages
        budgetCtrl.calculatePercentages();
        // 2. Read the Percentages from Budget Controller
        var pers = budgetCtrl.getPercentages();
        console.log(pers);
        // 3. Display Percentages on UI with new Percentages
        userInterfaceCtrl.DisplayPercentages(pers);

    };
    var ctrlAddItem = function () {

        var input,
            newItem;

        // 1. Get Input/Field Data
        input = userInterfaceCtrl.GetInput();
        //Check for Faulty Inputs
        if (input.description !== "" && !Number.isNaN(input.value) && input.value > 0) {
            // 2. Add item to Budget Controller
            newItem = budgetCtrl.AddItem(input.type, input.description, input.value);
            // 3. Add item to User Interface
            userInterfaceCtrl.AddListItem(newItem, input.type);
            // 4. Clear Fields
            userInterfaceCtrl.ClearFields();
            // 5. Calculate and Update Budget
            updateBudget();
            // 6. Calculate and Update Percentages
            updatePercentages();
        }

    };

    return {
        init: () => {
            console.log('init Function working');
            userInterfaceCtrl.DisplayDate();
            userInterfaceCtrl.DisplayBudget({
                totals: {
                    inc: 0,
                    exp: 0
                },
                budget: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    };
})(BudgetController, UIController);

AppController.init();