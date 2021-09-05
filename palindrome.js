function reverseString(str){
    var charList = str.split('');
    var reverseList = charList.reverse();
    return reverseList.join('');
}

function isPalindrome(str){
    var reverseStr = reverseString(str);
    if(reverseStr === str){
        return true;
    } else{
        return false;
    }
}

/* console.log(isPalindrome("Debashis")); */

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

/* var date = {day: 14, month: 10, year: 2020}
console.log(getDateString(date)); */


function getAllDateFormats(date){
    var dateString = getDateString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

/* var date = {day: 14, month: 10, year: 2020}
console.log(getAllDateFormats(date)); */

function checkPalindromeForAllDateFormats(date){
    var allDateFormats = getAllDateFormats(date);
    var flag = false;

    for(let index = 0; index < allDateFormats.length; index++){
        if(isPalindrome(allDateFormats[index])){
            flag = true;
            break;
        }
    }
    return flag;
}


/* var date = {day: 14, month: 10, year: 2020}
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

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        } else{
            if(day > 28){
                day = 1;
                month++;
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


function getNextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var counter = 0;

    while(1){
        counter++;
        if(checkPalindromeForAllDateFormats(nextDate)){
            return [counter, nextDate];
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 3){
       if(day < 1){
            if(isLeapYear(year)){
                day = 29;
                month--;
            } else{
                day = 28;
                month--;
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

function getPreviousPalindromeDate(date){
    var previousDate = getPreviousDate(date);
    var counter = 0;

    while(1){
        counter++;
        if(checkPalindromeForAllDateFormats(previousDate)){
            return [counter, previousDate];
        }
        previousDate = getPreviousDate(previousDate);
    }
}


var inputBday = document.querySelector('#input-bday');
var showButton = document.querySelector('#btn-output');
var outputElement = document.querySelector('#output');


function dayOrDays(dayCounter){
    return (dayCounter === 1) ? "day" : "days";     
}

function clickHandler(){
    var bdayString = inputBday.value;

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