function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  const formattedTime = now.toLocaleTimeString();

  document.getElementById('date-time').textContent = `${formattedDate}, ${formattedTime}`;
}

// პირველივე ჩატვირთვაზე და შემდეგ ყოველ წამში
updateDateTime();
setInterval(updateDateTime, 1000);

