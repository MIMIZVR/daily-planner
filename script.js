// Live Clock in Header
function updateClock(){
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  document.getElementById("currentTime").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

//Weather App
const apiKey = "22d8dc9681ce0f0227b6445d0ffa7bcc";
const city = "Tbilisi"; 


function getWeatherUpdate() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(info => {
      const temperature = Math.round(info.main.temp);
      const weatherType = info.weather[0].main;
      const iconCode = info.weather[0].icon;

      let message = "";
      if (weatherType === "Rain") {
        message = "Don't forget an umbrella ☔";
      } else if (weatherType === "Clear") {
        message = "Today weather is nice ☀️ Break a leg !";
      } else if (weatherType === "Clouds") {
        message = "sky is cloudy 🌥 – Tea will calm you down 🍵";
      } else if (weatherType === "Snow") {
        message = "It's Snowing! ❄️ Don't forget a hat!🧣";
      } else if (weatherType === "Mist") {
        message = "It's Foggy 🌫️ – Wear Glasses!";
      } else {
        message = "Have Fun, Never mind the weather! 🌈";
      }

      document.getElementById("weatherBox").innerHTML = `
        <div class="weather-info">
          <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${weatherType}" class="weather-icon">
          <div>
            <div class="weather-temp"><strong>${temperature}°C</strong> | ${weatherType}</div>
            <div class="weather-message">${message}</div>
          </div>
        </div>
      `;
    })
    .catch(() => {
      document.getElementById("weatherBox").textContent = "ამინდის ჩატვირთვა ვერ მოხერხდა ☁️";
    });
}
getWeatherUpdate();

//calendar
function updateCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  document.getElementById("currentDate").textContent = dateString;
}
updateCurrentDate();


const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

loadTasks();
