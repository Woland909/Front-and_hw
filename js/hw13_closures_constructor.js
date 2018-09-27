//            Closing

//3)
function min(num1 = 0) {
   return function (num2 = 0) {
       return num1 - num2;
   }
}

//4)
function MultiplyMaker(num1) {
    let res = num1;
    return function(num1) {
        return res = num1 * res;
    } 
}
const multiply = MultiplyMaker(2);

//5)
const moduleStr = (function() {
    let resStr = '';

    function setLine(str) { 
        return  str ? resStr += str : '';
    }

    function getLine() {
        return resStr;
    }

    function getLineLength() {
        return resStr.length;
    }

    function reverseSrt() {
        return resStr.split('').reverse().join('');
    }

    return {
        setLine, getLine, getLineLength, reverseSrt
    };
})();

//6)
const moduleCalc = (function() {
    let res = 0;

    function setNum(num) {
        return res += num;
    }

    function plus(num = 0) {
        return res += num;
    }

    function minus(num = 0) {
        return res -= num;
    }

    function multiply(num = 1) {
        return res *= num;
    }

    function divide(num = 1) {
        return res /= num;
    }

    function degree(num = 1) {
        return res = Math.pow(res, num);
    }

    function resul() {
        return parseFloat(res.toFixed(2));
    }
    
    return {setNum,plus,minus,multiply,divide,degree,resul}

})();

//           Constructor
//1)

function Auto(name, age) {
    this.name = name;
    this.age = age;
    

    this.getName = function() {
        return name[0].toUpperCase() + name.slice(1);
    }

    this.getAge = function() {
        let now = new Date();
        return now.getFullYear() - age;
    }
}
const audi = new Auto('audi', 5);

//2)
function Encryption(str) {
    let strEncryption = str;

    this.getStr = function() {
        return strEncryption;
    }

    this.getEncryption = function() {
        return strEncryption.split('').reverse().join('');
    }

    this.reset = function() {
        return strEncryption = '';
    }
}

const sicret = new Encryption('Привет');

