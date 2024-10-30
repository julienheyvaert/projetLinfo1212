const time = new Date()
var year = String(time.getFullYear());
var month = String(time.getMonth() + 1);
var day = String(time.getDate());
var day_index = time.getDate();
const week_days = ["Mon. ", "Tue. ", "Wed. ", "Thu. ", "Fri. ", "Sat. ", "Sun. "];
var current_date = week_days[day_index%7] + day + "/" + month + "/" + year
document.getElementById("current_date").innerHTML = current_date;