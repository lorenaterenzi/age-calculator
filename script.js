var labelDay = document.getElementById('day-label');
var boxDay = document.getElementById('day');
var divDay = document.getElementById('day-div');

var labelMonth = document.getElementById('month-label');
var boxMonth = document.getElementById('month');
var divMonth = document.getElementById('month-div');

var labelYear = document.getElementById('year-label');
var boxYear = document.getElementById('year');
var divYear = document.getElementById('year-div')

//função onclick
function submitForm() {
    var textDay = document.querySelector('input#day');
    var textMonth = document.querySelector('input#month');
    var textYear = document.querySelector('input#year');

    checkIfEmpty(textDay, textMonth, textYear);

    var nDay = parseInt(textDay.value);
    var nMonth = parseInt(textMonth.value) - 1;
    var nYear = parseInt(textYear.value);

    checkIfValid(nDay, nMonth, nYear);

    var birthdate = new Date(nYear, nMonth, nDay).getTime();


    calcAge(birthdate, nMonth, nDay, nYear);

    textDay.value = '';
    textMonth.value = '';
    textYear.value = '';

}

function checkIfValid(day, month, year) {
    var now = new Date();

    var nowYear = now.getFullYear();

    var invalidYearDiv = document.querySelector('p.year-class');
    var invalidMonthDiv = document.querySelector('p.month-class');
    var invalidDayDiv = document.querySelector('p.day-class')

    if (year > nowYear) {
        turnStuffRed(labelYear, boxYear);

        var invalidYear;
        var yearClass = 'year-class'
        invalidWarning(divYear, invalidYear, yearClass)
    } else if (divYear.contains(invalidYearDiv)) {
        resetColor(labelYear, boxYear)
        invalidYearDiv.remove();
    }

    if (month > 11) {
        turnStuffRed(labelMonth, boxMonth)

        var invalidMonth;
        var monthClass = 'month-class'
        invalidWarning(divMonth, invalidMonth, monthClass);
    } else if (divMonth.contains(invalidMonthDiv)) {
        resetColor(labelMonth, boxMonth)
        invalidMonthDiv.remove();
    }

    if (day > getDays(month, year)) {
        turnStuffRed(labelDay, boxDay)
        var invalidDay;
        var dayClass = 'day-class'
        invalidWarning(divDay, invalidDay, dayClass);
    } else if (divDay.contains(invalidDayDiv)) {
        resetColor(labelDay, boxDay)
        invalidDayDiv.remove();
    }



}

//função para checar o número de dias em um mês
function getDays(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function checkIfEmpty(formDay, formMonth, formYear) {

    var warningDivDay = document.querySelector('p.class-day');
    var warningDivMonth = document.querySelector('p.class-month');
    var warningDivYear = document.querySelector('p.class-year');

    if (formDay.value.length == 0) {

        turnStuffRed(labelDay, boxDay);

        var warningDay;
        var classDay = 'class-day'
        emptyWarning(divDay, warningDay, classDay);

    } else if (divDay.contains(warningDivDay)) {
        resetColor(labelDay, boxDay);
        warningDivDay.remove();
    };

    if (formMonth.value.length == 0) {

        turnStuffRed(labelMonth, boxMonth);

        var warningMonth;
        var classMonth = 'class-month'
        emptyWarning(divMonth, warningMonth, classMonth);

    } else if (divMonth.contains(warningDivMonth)) {
        resetColor(labelMonth, boxMonth);
        warningDivMonth.remove();
    };

    if (formYear.value.length == 0) {

        turnStuffRed(labelYear, boxYear)

        var warningYear;
        var classYear = 'class-year'
        emptyWarning(divYear, warningYear, classYear);

    } else if (divYear.contains(warningDivYear)) {
        resetColor(labelYear, boxYear);
        warningDivYear.remove();
    };
}


function turnStuffRed(label, box) {
    // pega as labels para deixa-las vermelhas
    label.style.color = 'hsl(0, 100%, 67%)';

    // pega os inputs para deixar as bordas vermelhas
    box.style.borderColor = 'hsl(0, 100%, 67%)';

}

function invalidWarning(fatherDiv, warningInvalid, warningClass) {
    var warningInvalid = document.createElement('p');
    warningInvalid.style.fontSize = '14px';
    warningInvalid.style.color = 'hsl(0, 100%, 67%)';
    warningInvalid.style.fontWeight = '400';
    warningInvalid.style.fontStyle = 'italic';
    warningInvalid.classList = `${warningClass}`
    warningInvalid.innerHTML = 'Invalid data';

    fatherDiv.appendChild(warningInvalid);
}

function emptyWarning(fatherDiv, warning, warningName) {
    var warning = document.createElement('p');
    warning.style.fontSize = '14px';
    warning.style.color = 'hsl(0, 100%, 67%)';
    warning.style.fontWeight = '400';
    warning.style.fontStyle = 'italic';
    warning.classList = `${warningName}`
    warning.innerHTML = 'Please fill in the form';

    fatherDiv.appendChild(warning);
}


function resetColor(label, box) {
    label.style.color = 'hsl(0, 1%, 44%)'
    box.style.borderColor = 'hsl(0, 0%, 86%)'
}

function calcAge(birth, month, days, year) {
    var today = new Date().getTime();

    var ageMilliseconds = today - birth;

    var thisDay = new Date().getUTCDate();

    var thisMonth = new Date().getMonth();

    var thisYear = new Date().getFullYear();

    //one day in milliseconds
    var oneDay = 24 * 60 * 60 * 1000;

    var milliToDays = ageMilliseconds / oneDay;

    //calculo dos dias
    var ageDays;

    if (days > thisDay) {

        var nOfDays = getDays(thisMonth - 1, thisYear);
        var ageOfDays = (nOfDays - days) + thisDay;

        ageDays = ageOfDays;

    } else if (days < thisDay) {

        ageDays = thisDay - days;

    }

    //calculo dos meses
    var ageMonths;
    ageMonths = Math.floor((milliToDays % 365.25) / 30);

    //calculo dos anos
    if (month > thisMonth) {
        ageYears = thisYear-year-1;
    } else {
        ageYears = thisYear-year;
    }

    //condições para postar a idade
    if (ageDays >= 0 && ageMonths >= 0 && ageYears >= 0 && month <= 11 && days <= getDays(month, year)) {
        postAge(ageYears, ageMonths, ageDays);
    }

}

function postAge(year, month, day) {
    var pYear = document.querySelector('p.p__year');
    var pMonth = document.querySelector('p.p__month');
    var pDay = document.querySelector('p.p__days');

    pYear.innerHTML = `${year}`;
    pMonth.innerHTML = `${month}`;
    pDay.innerHTML = `${day}`;
}
