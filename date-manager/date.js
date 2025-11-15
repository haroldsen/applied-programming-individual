
const shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDayOfMonth = currentDate.getDate();
const currentDayOfWeek = weekdays[currentDate.getDay()];

const todayHeader = document.getElementById('today-header');
const monthSelect = document.getElementById('month-select');
const eventList = document.getElementById('event-list');

for (let i = 0; i < shortMonths.length; i ++) {
    monthSelect.insertAdjacentHTML('beforeend', `<option value="${i}">${shortMonths[i]}</option>`);
}

const formattedDate = `${currentDayOfWeek}, ${fullMonths[currentMonth]} ${currentDayOfMonth}, ${currentYear}`;
todayHeader.innerHTML = `Today is<br>${formattedDate}`;

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
    renderEventList();
    titleInput.focus();
}

function sortEvents() {
    events.sort((a, b) => {
        return getDaysUntil(a.month, a.day) - getDaysUntil(b.month, b.day);
    });
    localStorage.setItem('events', JSON.stringify(events));
}

function renderEventList() {
    sortEvents();
    eventList.innerHTML = '';
    for (let i = 0; i < events.length; i ++) {
        let daysAway = getDaysUntil(events[i].month, events[i].day);
        eventHTML = `
            <li class="event" data-event-index="${i}">
                <div class="row">
                    <div class="days-away col">
                        <p class="days-until-text">${daysAway}</p>
                        <p>days away</p>
                    </div>
                    <div class="col">
                        <p>${events[i].title}</p>
                        <p>${shortMonths[events[i].month]}-${events[i].day}</p>
                    </div>
                </div>
                <button>X</button>
            </li>
        `;
        eventList.insertAdjacentHTML('beforeend', eventHTML);
    }
}

function loadEvents() {
    // localStorage.setItem('events', JSON.stringify([]));
    if (localStorage.getItem('events') !== null) {
        return JSON.parse(localStorage.getItem('events'));
    } else {
        localStorage.setItem('events', JSON.stringify([]));
        return [];
    }
}

function handleEventDelete(e) {
    if (e.target.tagName === 'BUTTON') {
        const eventElement = e.target.closest('li');
        const indexToRemove = eventElement.dataset.eventIndex;
        events.splice(indexToRemove, 1);
        localStorage.setItem('events', JSON.stringify(events));
        renderEventList();
    }
}

function getDaysUntil(month, day) {

    let targetYear = currentYear;

    if (month < currentMonth || (month == currentMonth && day < currentDayOfMonth)) {
        targetYear = currentYear + 1;
    }

    const target = new Date(targetYear, month, day);

    let todayCopy = currentDate;

    target.setHours(0, 0, 0, 0);
    todayCopy.setHours(0, 0, 0, 0);

    const differenceInTime = target.getTime() - todayCopy.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    let differenceInDays = Math.floor(differenceInTime / millisecondsInDay);

    return differenceInDays;
}

let events = loadEvents();
renderEventList();
document.getElementById('submit-event-button').addEventListener('click', tryAddEvent);
eventList.addEventListener('click', handleEventDelete);
