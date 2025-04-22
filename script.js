document.getElementById('authBtn').addEventListener('click', function () {
  const gender = document.getElementById('genderSelect').value;
  const body = document.body;
// თემა ჩატვირთვისას
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
});

// ღილაკზე დაჭერისას
document.getElementById('authBtn').addEventListener('click', function () {
  const gender = document.getElementById('genderSelect').value;
  const body = document.body;

  body.classList.remove('theme-female', 'theme-male');

  if (gender === 'female') {
    body.classList.add('theme-female');
    localStorage.setItem('theme', 'theme-female');
  } else if (gender === 'male') {
    body.classList.add('theme-male');
    localStorage.setItem('theme', 'theme-male');
  } else {
    alert('გთხოვ აირჩიო სქესი');
  }
});

  // წაშალე ძველი თემები
  body.classList.remove('theme-female', 'theme-male');

  // დაამატე არჩეული თემა
  if (gender === 'female') {
    body.classList.add('theme-female');
  } else if (gender === 'male') {
    body.classList.add('theme-male');
  } else {
    alert('გთხოვ აირჩიო სქესი');
  }
});


// ==== Live Clock ====
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB');
  document.querySelector('.clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock(); // Initial update

// ==== Calendar ====
function updateCalendar() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.querySelector('.calendar').textContent = now.toLocaleDateString('en-US', options);
}

// Updates every hour
setInterval(updateCalendar, 3600000); 
updateCalendar(); // Initial update on page load



const authBtn = document.getElementById("authBtn");
let isLoggedIn = false; // ცვლადი მდგომარეობის შესანახად

authBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    // გამოსვლა
    isLoggedIn = false;
    authBtn.textContent = "შესვლა";
    alert("გადი პირადი კაბინეტიდან");
    // აქ შეგიძლია დამალო პირადი კაბინეტის ელემენტები
  } else {
    // შესვლა
    isLoggedIn = true;
    authBtn.textContent = "გასვლა";
    alert("მოგესალმებით, პირად კაბინეტში!");
    // აქ შეგიძლია აჩვენო პირადი კაბინეტის ელემენტები
  }
});




// ==== To-Do List ====
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      showQuoteBasedOnTasks();  // Update quote based on task status
    });

    taskList.appendChild(li);
    taskInput.value = "";
    showQuoteBasedOnTasks();  // Update quote after adding a task
  }
});

function showQuoteBasedOnTasks() {
  const tasks = taskList.querySelectorAll("li");
  const completed = taskList.querySelectorAll("li.completed");

  const quoteBox = document.getElementById("quote");

  if (tasks.length > 0 && completed.length === tasks.length) {
    // All tasks are completed
    quoteBox.textContent = "Great job! Keep going! 🌟";
  } else if (completed.length > 0) {
    // Some tasks are completed
    quoteBox.textContent = "You're on fire today! 🔥";
  } else {
    // No tasks are completed
    quoteBox.textContent = "Start your day productively! 💪";
  }
}
// ==== Quote of the Day ====
const quoteOfTheDayBox = document.getElementById("quoteOfTheDay");

const dailyQuotes = [
  "Each day is a new beginning. 🌅",
  "Success is not the key to happiness. Happiness is the key to success. 🌟",
  "The future belongs to those who believe in the beauty of their dreams. ✨",
  "Believe you can and you're halfway there. 💪",
  "It always seems impossible until it’s done. 🚀",
];

function displayQuoteOfTheDay() {
  const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
  quoteOfTheDayBox.textContent = dailyQuotes[randomIndex];
}

// Initial quote display
displayQuoteOfTheDay();

// Set a new quote every day at midnight (86400000ms)
setInterval(displayQuoteOfTheDay, 86400000);  // 86400000 ms = 1 day

// ==== Schedule ====
const timeInput = document.getElementById("timeInput");
const activityInput = document.getElementById("activityInput");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleList = document.getElementById("scheduleList");

addScheduleBtn.addEventListener("click", () => {
  const time = timeInput.value.trim();
  const activity = activityInput.value.trim();
  if (time && activity) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${time}</strong>: ${activity}`;
    scheduleList.appendChild(li);
    timeInput.value = "";
    activityInput.value = "";
  }
});

// ==== Mood Selection ====
const emojis = document.querySelectorAll(".emoji");
const selectedMood = document.getElementById("selectedMood");

emojis.forEach(emoji => {
  emoji.addEventListener("click", () => {
    selectedMood.textContent = emoji.textContent;
    selectedMood.className = "animated-mood " + emoji.dataset.mood;
  });
});

// ==== Weather (OpenWeather API) ====
const weatherBox = document.getElementById("weatherBox");
const weatherTemp = document.querySelector(".weather-temp");
const weatherIcon = document.querySelector(".weather-icon");
const weatherMsg = document.querySelector(".weather-message");

const API_KEY = "22d8dc9681ce0f0227b6445d0ffa7bcc"; // Correct API Key

function fetchWeather(city = "Tbilisi") {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const temp = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      weatherTemp.textContent = `${temp}°C`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.alt = description;
      weatherMsg.textContent = description;
    })
    .catch(error => {
      weatherTemp.textContent = "--";
      weatherMsg.textContent = "Unable to fetch weather.";
      console.error("Weather Error:", error);
    });
}

fetchWeather();  // Initial weather fetch
