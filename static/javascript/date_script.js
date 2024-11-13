
const time = new Date();
var year = String(time.getFullYear());
var month = String(time.getMonth() + 1).padStart(2, '0');
var day = String(time.getDate()).padStart(2, '0');
const week_days = ["Sun. ", "Mon. ", "Tue. ", "Wed. ", "Thu. ", "Fri. ", "Sat. "];
var day_index = time.getDay();
var current_date = week_days[day_index] + day + "/" + month + "/" + year;

document.getElementById("current_date").innerHTML = current_date;

