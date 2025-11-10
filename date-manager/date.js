
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const todayHeader = document.getElementById('today-header');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = months[currentDate.getMonth()];
const currentDayOfMonth = currentDate.getDate();
const currentDayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][currentDate.getDay()];
const monthSelect = document.getElementById('month-select');

for (let i = 0; i < months.length; i ++) {
    monthSelect.insertAdjacentHTML('beforeend', `<option>${months[i]}</option>`);
}

const formattedDate = `${currentYear}-${currentMonth}-${currentDayOfMonth}-${currentDayOfWeek}`;
todayHeader.innerHTML = formattedDate;

function tryAddEvent(e) {
    e.preventDefault;
    const titleInput = document.getElementById('title-input');
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    events.push({
        title: titleInput.value,
        month: monthSelect.value,
        day: daySelect.value
    });
    titleInput.value = '';
    monthSelect.value = 'JAN';
    daySelect.value = '';
    localStorage.setItem('events', JSON.stringify(events));
    renderEventList(events);
    titleInput.focus();
}

function renderEventList(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    for (let i = 0; i < events.length; i ++) {
        let daysAway = 1;
        eventHTML = `
            <li class="event row">
                <div class="days-away col">
                    <p class="days-until-text">${daysAway}</p>
                    <p>days away</p>
                </div>
                <div class="col">
                    <p>${events[i].title}</p>
                    <p>${events[i].month}-${events[i].day}</p>
                </div>
            </li>
        `;
        eventList.insertAdjacentHTML('beforeend', eventHTML);
    }
}

function loadEvents() {
    if (localStorage.getItem('events') !== null) {
        return JSON.parse(localStorage.getItem('events'));
    } else {
        localStorage.setItem('events', JSON.stringify([]));
        return [];
    }
}

let events = loadEvents();
renderEventList(events);
document.getElementById('submit-event-button').addEventListener('click', tryAddEvent);
