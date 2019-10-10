function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const operators = {
        '+': function (a, b)  {
            return a + b;
        },
        '-': function (a, b)  {
            return a - b;
        },
        '/': function (a, b)  {
            if ( b === 0) {
                throw new Error('TypeError: Division by zero.')
            } else {
                return a / b;
            }
        },
        '*': function (a, b)  {
            return a * b;
        },
    };

    let finalArray = [];
    let index = 0;

    function operation(arr, str) {

        if (index >= arr.length) {
            index = 0;
            return arr;
        } else if(!isNaN(Number(arr[index])) && arr[index + 1] === str &&!isNaN(Number(arr[index + 2]))) {
            arr[index] = operators[str](arr[index], arr[index + 2]);
            arr.splice(index + 1, 2);
            return operation(arr, str);
        } else {
            index++;
            return operation(arr, str);
        }
    }

    function calcBracketsExpression(arr) {
        let openBrackets = arr.lastIndexOf('(');
        let closeBrackets;
        let bracketsExpressionArr;
        let amountBrackets = arr.reduce((acc, item) => {
            if (item === '(') {
                acc++;
            } else if (item === ')') {
                acc--;
            }
            return acc;
        }, 0);
        if (amountBrackets !== 0) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
        if (openBrackets !== -1) {

            closeBrackets = arr.slice(openBrackets + 1).findIndex(item => item === ')');
            bracketsExpressionArr = arr.slice(openBrackets + 1).slice(0, closeBrackets);
            operation(bracketsExpressionArr, '/');
            operation(bracketsExpressionArr, '*');
            operation(bracketsExpressionArr, '-');
            operation(bracketsExpressionArr, '+');
            arr.splice(openBrackets, closeBrackets + 2, bracketsExpressionArr[0]);
            return calcBracketsExpression(arr);

        } else {
            return arr;
        }
    }

    let arr = expr.split('');
    arr = arr.filter(item => {
        if (item !== ' ') {
            return item;
        }
    });

    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(Number(arr[i]))) {
            if (!isNaN(Number(finalArray[finalArray.length - 1]))) {
                let tempNumber = finalArray[finalArray.length - 1];
                finalArray.pop();
                finalArray.push(tempNumber + arr[i]);
            } else {
                finalArray.push(arr[i]);
            }

        } else {
            finalArray.push(arr[i]);
        }
    }

    finalArray = finalArray.map(item => {
        if(!isNaN(Number(item))) {
            return Number(item);
        } else {
            return item;
        }
    });

    calcBracketsExpression(finalArray);
    operation(finalArray, '/');
    operation(finalArray, '*');
    operation(finalArray, '-');
    operation(finalArray, '+');

    return finalArray[0];
}

module.exports = {
    expressionCalculator
}
