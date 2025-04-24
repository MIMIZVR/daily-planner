// ==== Auth Logic ====
const authForm = document.getElementById('authForm');
const authBtn = document.getElementById('authBtn');
const loginForm = document.getElementById('authFormContent');
const logoutBtn = document.getElementById('logoutBtn');  // Corrected ID for logout button
const registerBtn = document.getElementById('registerBtn');
const closeFormBtn = document.getElementById('closeFormBtn');

// Update Auth UI based on whether the user is logged in
function updateAuthUI() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    // If logged in, show logout button and hide login button
    authBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    logoutBtn.textContent = "გასვლა";
  } else {
    // If not logged in, show login button and hide logout button
    authBtn.style.display = 'inline-block';
    // authBtn.textContent = 'შესვლა';
    logoutBtn.style.display = 'none';
  }
}

// Auth button click to show the login form
authBtn.addEventListener('click', () => {
  authForm.style.display = 'block'; // Make the form visible when login button is clicked
});

// Form submission event to handle login
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    localStorage.setItem('currentUser', username); // Set user in local storage
    alert(`Welcome, ${username}!`);
    authForm.style.display = 'none'; // Close the form
    updateAuthUI(); // Update UI for authenticated state
  } else {
    alert("Please enter valid username and password.");
  }
});

// Logout button click to log out the user
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser'); // Remove user from local storage
  updateAuthUI(); // Update UI for unauthenticated state
  alert("თქვენ გამოხვედით სისტემიდან.");
});

// Register button (in case you want to implement registration)
registerBtn.addEventListener('click', () => {
  alert("Registration functionality is not implemented yet.");
});

// Run the updateAuthUI function on page load to show correct button state
window.addEventListener('DOMContentLoaded', updateAuthUI);

// ფორმის დახურვა "X" ღილაკით
closeFormBtn.addEventListener('click', () => {
  authForm.style.display = 'none';
});

// გარეთ დაჭერისას ფორმის დახურვა
window.addEventListener('click', (e) => {
  if (e.target === authForm) {
    authForm.style.display = 'none';
  }
});



// ==== Weather Logic ====
const weatherBox = document.getElementById("weatherBox");
const weatherTemp = document.querySelector(".weather-temp");
const weatherIcon = document.querySelector(".weather-icon");
const weatherMsg = document.querySelector(".weather-message");
const API_KEY = "22d8dc9681ce0f0227b6445d0ffa7bcc";

function fetchWeather(city = "Tbilisi") {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].description;
      weatherMsg.textContent = data.weather[0].description;
    })
    .catch(error => {
      weatherTemp.textContent = "--";
      weatherMsg.textContent = "Unable to fetch weather.";
      console.error("Weather Error:", error);
    });
}

// ==== Clock Logic ====
function updateClock() {
  const now = new Date();
  document.querySelector('.clock').textContent = now.toLocaleTimeString('en-GB');
}
setInterval(updateClock, 1000);

// ==== Calendar Logic ====
function updateCalendar() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.querySelector('.calendar').textContent = now.toLocaleDateString('en-US', options);
}
setInterval(updateCalendar, 3600000);

// ==== Gender Theme Logic ====
const genderSelect = document.getElementById('genderSelect');
function applyGenderTheme(gender) {
  document.body.classList.remove('theme-male', 'theme-female', 'bg-male', 'bg-female');
  if (gender === 'female') {
    document.body.classList.add('theme-female', 'bg-female');
  } else if (gender === 'male') {
    document.body.classList.add('theme-male', 'bg-male');
  }
}
genderSelect.addEventListener('change', () => {
  const gender = genderSelect.value;
  localStorage.setItem("selectedGender", gender);
  applyGenderTheme(gender);
});

// ==== ToDo List Logic ====
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTaskElement(taskTextValue) {
  const li = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = taskTextValue;
  taskText.classList.add("task-text");

  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");
    showQuoteBasedOnTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    savedTasks = savedTasks.filter(task => task !== taskTextValue);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    showQuoteBasedOnTasks();
  });

  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

savedTasks.forEach(createTaskElement);
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => e.key === "Enter" && addTask());

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    createTaskElement(task);
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskInput.value = "";
    showQuoteBasedOnTasks();
  }
}

// ==== Schedule Logic ====
const timeInput = document.getElementById("timeInput");
const planInput = document.getElementById("planInput");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleList = document.getElementById("scheduleList");
let savedSchedule = JSON.parse(localStorage.getItem('schedule')) || [];

function renderScheduleItem(time, activity) {
  const li = document.createElement("li");
  li.classList.add("schedule-item");

  const scheduleText = document.createElement("span");
  scheduleText.innerHTML = `<strong>${time}</strong>: ${activity}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    savedSchedule = savedSchedule.filter(item => !(item.time === time && item.activity === activity));
    localStorage.setItem('schedule', JSON.stringify(savedSchedule));
  });

  li.appendChild(scheduleText);
  li.appendChild(deleteBtn);
  scheduleList.appendChild(li);
}

savedSchedule.forEach(item => renderScheduleItem(item.time, item.activity));
addScheduleBtn.addEventListener("click", addSchedule);
planInput.addEventListener("keydown", (e) => e.key === "Enter" && addSchedule());

function addSchedule() {
  const time = timeInput.value.trim();
  const activity = planInput.value.trim();
  if (time && activity) {
    renderScheduleItem(time, activity);
    savedSchedule.push({ time, activity });
    localStorage.setItem('schedule', JSON.stringify(savedSchedule));
    timeInput.value = "";
    planInput.value = "";
  }
}

// ==== Mood Selection Logic ====
const emojis = document.querySelectorAll(".emoji");
const selectedMood = document.getElementById("selectedMood");

emojis.forEach(emoji => {
  emoji.addEventListener("click", () => {
    selectedMood.textContent = emoji.textContent;
    selectedMood.className = "animated-mood " + emoji.dataset.mood;
  });
});

// ==== Quote Logic ====
const quoteOfTheDayBox = document.getElementById("quoteOfTheDay");
const dailyQuotes = [
  "Each day is a new beginning. 🌅",
  "Success is not the key to happiness. 🌟",
  "Believe in your dreams. ✨",
  "Believe you can. 💪",
  "It always seems impossible until it’s done. 🚀",
  "“The only way to do great work is to love what you do.” — Steve Jobs",
  "“Success is not final, failure is not fatal.” — Churchill",
  "“The future belongs to those who believe in their dreams.” — Eleanor Roosevelt"
];

function displayQuoteOfTheDay() {
  const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
  quoteOfTheDayBox.textContent = dailyQuotes[randomIndex];
}
setInterval(displayQuoteOfTheDay, 86400000);

function showQuoteBasedOnTasks() {
  const tasks = document.querySelectorAll("#taskList li");
  const completedTasks = document.querySelectorAll("#taskList span.completed");
  quoteOfTheDayBox.textContent =
    tasks.length && tasks.length === completedTasks.length
      ? "Great job! You've completed all tasks!"
      : "Keep going!";
}

// ==== Init All on Page Load ====
window.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
  fetchWeather();
  updateClock();
  updateCalendar();
  const savedGender = localStorage.getItem("selectedGender");
  if (savedGender) {
    genderSelect.value = savedGender;
    applyGenderTheme(savedGender);
  }
  displayQuoteOfTheDay();
});
