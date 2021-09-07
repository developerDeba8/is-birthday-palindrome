function reverseString(str){
    var charList = str.split('');
    var reverseList = charList.reverse();
    return reverseList.join('');
}

/* console.log(reverseString('apple')); */

function isPalindrome(str){
    var reverseStr = reverseString(str);
    if(reverseStr === str){
        return true;
    } else{
        return false;
    }
}

/* console.log(isPalindrome("racecar")); */ 

function getDateString(date){
  var dateInString = {day: ' ', month: ' ', year: ' '};   
    if(date.day < 10){
        dateInString.day = "0" + date.day;
    } else{
        dateInString.day = date.day.toString();
    }

    if(date.month < 10){
        dateInString.month = "0" + date.month;
    } else{
        dateInString.month = date.month.toString();
    }

    dateInString.year = date.year.toString();

    return dateInString;
}

/* var date = {day: 5, month: 6, year: 2020}
console.log(getDateString(date));  */


function getAllDateFormats(date){
    var dateString = getDateString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    /* var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;  */

    return [ddmmyyyy, mmddyyyy, yyyymmdd];
}

/* var date = {day: 5, month: 7, year: 2021}
console.log(getAllDateFormats(date)); */ 

function checkPalindromeForAllDateFormats(date){
    var allDateFormats = getAllDateFormats(date);
    var flag = false;

    for(let index = 0; index < allDateFormats.length; index++){
        if(isPalindrome(allDateFormats[index])){
            /* console.log(allDateFormats[index]); */
            flag = true;
            break;
        }
    }
    return flag;
}


/* var date = {day: 11, month: 2, year: 2020}
console.log(checkPalindromeForAllDateFormats(date)); */

function isLeapYear(year){
    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

  return false;
}

/* console.log(isLeapYear(2021)); */

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month = 3;
            }
        } else{
            if(day > 28){
                day = 1;
                month = 3;
            }
        }
    } else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        day = 1;
        month = 1;
        year++;
    }

    return {
        day : day,
        month: month,
        year: year
    }
}

/* var date = {day: 31, month: 12, year: 2020}
console.log(getNextDate(date)); */

function getNextPalindromeDate(date){
    /* console.log(date); */
    var counterNext = 0;
    var nextDate = getNextDate(date);
    

    while(1){
        counterNext++;
        if(checkPalindromeForAllDateFormats(nextDate)){
            return [counterNext, nextDate];
        }
        nextDate = getNextDate(nextDate);
    }
}

 /* var date = {day: 7, month: 2, year: 2020}
console.log(getNextPalindromeDate(date));  */ 


function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 3){
       if(day < 1){
            if(isLeapYear(year)){
                day = 29;
                month = 2;
            } else{
                day = 28;
                month = 2;
            }
       }
    } else{
        if(day < 1){
            day = daysInMonth[month - 2];
            month--;
        }
    }

    if(month < 1){
        day = 31;
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}


/* var date = {day: 1, month: 3, year: 2021}
console.log(getPreviousDate(date)); */

function getPreviousPalindromeDate(date){
    var previousDate = getPreviousDate(date);
    var counterPrev = 0;

    while(1){
        counterPrev++;
        if(checkPalindromeForAllDateFormats(previousDate)){
            return [counterPrev, previousDate];
        }
        previousDate = getPreviousDate(previousDate);
    }
}

/* var date = {day: 7, month: 2, year: 2020}
console.log(getPreviousPalindromeDate(date));  */

var inputBday = document.querySelector('#input-bday');
var showButton = document.querySelector('#btn-output');
var outputElement = document.querySelector('#output');


function dayOrDays(dayCounter){
    return (dayCounter === 1) ? "day" : "days";     
}

function clickHandler(){
    var bdayString = inputBday.value;
    /* console.log(typeof(bdayString), bdayString); */

    if(bdayString !== ''){
        var date = bdayString.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2]; 

        var currDate = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        /* console.log(date, currDate); */

        if(!checkPalindromeForAllDateFormats(currDate)){
            const [counterOfNextPalindromeDate, nextDate] = getNextPalindromeDate(currDate);
            const [counterOfPreviousPalindromeDate, prevDate] = getPreviousPalindromeDate(currDate);

            console.log(counterOfNextPalindromeDate, counterOfPreviousPalindromeDate)
            console.log(nextDate, prevDate); 

            if(counterOfNextPalindromeDate > counterOfPreviousPalindromeDate){
                
                outputElement.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${counterOfPreviousPalindromeDate} ${dayOrDays(counterOfPreviousPalindromeDate)}`;
            } else{
                outputElement.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counterOfNextPalindromeDate} ${dayOrDays(counterOfNextPalindromeDate)}`;
            }
        } else {
            outputElement.innerText = "Yay! Your birthday is palindrome!";
        }
    }

}

showButton.addEventListener('click', clickHandler);