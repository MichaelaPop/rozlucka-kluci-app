/*
 * Main script for the boys' bachelor party app.
 * Loads tasks and motivational messages from JSON files,
 * sets up the page for a particular participant,
 * and manages score updates in Firebase Realtime Database.
 */

// Firebase configuration for rozlucka-kluci-app
const firebaseConfig = {
  apiKey: "AIzaSyDxHiv2vYA_ByTIn_yqoleJSQWBNjvk_MA",
  authDomain: "rozlucka-kluci-app.firebaseapp.com",
  databaseURL: "https://rozlucka-kluci-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rozlucka-kluci-app",
  storageBucket: "rozlucka-kluci-app.appspot.com",
  messagingSenderId: "843716532295",
  appId: "1:843716532295:web:5c66be2e54446ed2f1b962"
};

// Initialize Firebase app and database (if not already initialized)
if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// List of participants (with display names) for scoreboard
const players = ["Tom", "Míra", "Martin", "Lukáš", "Vláďa"];

// Mapping of display names to database keys (without diacritics)
const nameKeyMap = {
  "Tom": "Tom",
  "Míra": "Mira",
  "Martin": "Martin",
  "Lukáš": "Lukas",
  "Vláďa": "Vlada"
};

// Mapping of display names to avatar images
const playerImages = {
  "Tom": "avatars/tom.png",
  "Míra": "avatars/mira.png",
  "Martin": "avatars/martin.png",
  "Lukáš": "avatars/lukas.png",
  "Vláďa": "avatars/vlada.png"
};

// Containers for tasks and motivational messages
let tasks = [];
let messages = [];

/**
 * Load tasks from tasks.json. Each task has the following fields:
 *   id: number
 *   text: string
 *   subtask: string | null
 *   points: number
 */
async function loadTasks() {
  try {
    const resp = await fetch('tasks.json');
    tasks = await resp.json();
  } catch (err) {
    console.error('Failed to load tasks:', err);
    tasks = [];
  }
}

/**
 * Load motivational messages from messages.json.
 */
async function loadMessages() {
  try {
    const resp = await fetch('messages.json');
    messages = await resp.json();
  } catch (err) {
    console.error('Failed to load messages:', err);
    messages = [];
  }
}

/**
 * Select a random motivational message.
 */
function getRandomMessage() {
  if (!messages || messages.length === 0) return '';
  const idx = Math.floor(Math.random() * messages.length);
  return messages[idx];
}

/**
 * Update a player's score in Firebase by adding the given number of points.
 * @param {string} playerName Display name of player
 * @param {number} points Number of points to add
 */
function updateScore(playerName, points) {
  const key = nameKeyMap[playerName] || playerName;
  const ref = database.ref('scores/' + key);
  ref.transaction(function (current) {
    return (current || 0) + points;
  });
}

/**
 * Render the live scoreboard. Listens for updates on the 'scores' path and
 * updates the table with avatars, names, and current scores.
 */
function renderScoreboard() {
  const tbody = document.getElementById('scoreboard-body');
  if (!tbody) return;
  database.ref('scores').on('value', function (snapshot) {
    const data = snapshot.val() || {};
    // Clear existing rows
    tbody.innerHTML = '';
    players.forEach(function (name) {
      const key = nameKeyMap[name];
      const score = data[key] || 0;
      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      nameTd.className = 'player-cell';
      const avatarImg = document.createElement('img');
      avatarImg.src = playerImages[name] || '';
      avatarImg.className = 'avatar-small';
      const span = document.createElement('span');
      span.textContent = name;
      nameTd.appendChild(avatarImg);
      nameTd.appendChild(span);
      const scoreTd = document.createElement('td');
      scoreTd.textContent = score;
      tr.appendChild(nameTd);
      tr.appendChild(scoreTd);
      tbody.appendChild(tr);
    });
  });
}

/**
 * Setup the page for a specific participant. Must be called after tasks
 * and messages are loaded. Creates DOM elements for tasks and attaches
 * event handlers to update scores.
 * @param {string} participantName Display name of participant
 */
function setupPage(participantName) {
  // Set participant name in header
  const nameEl = document.getElementById('participant-name');
  if (nameEl) nameEl.textContent = participantName;
  // Set large avatar if exists
  const largeAvatar = document.querySelector('.avatar-large');
  if (largeAvatar) {
    largeAvatar.src = playerImages[participantName] || '';
    largeAvatar.alt = participantName;
  }
  const tasksContainer = document.getElementById('tasks-list');
  const messageEl = document.getElementById('motivational-message');
  if (!tasksContainer) return;
  // Clear any existing tasks
  tasksContainer.innerHTML = '';
  tasks.forEach(function (task, idx) {
    // Main task element
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task-' + idx;
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = task.text;
    // Points indicator
    const pointsSpan = document.createElement('span');
    pointsSpan.className = 'points';
    pointsSpan.textContent = ` (+${task.points})`;
    label.appendChild(pointsSpan);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    tasksContainer.appendChild(taskDiv);
    // Event for completing main task
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        updateScore(participantName, task.points);
        if (messageEl) messageEl.textContent = getRandomMessage();
      }
    });
    // If there is a subtask, add subtask checkbox underneath
    if (task.subtask) {
      const subTaskDiv = document.createElement('div');
      subTaskDiv.className = 'task-item';
      subTaskDiv.style.marginLeft = '20px';
      const subCheckbox = document.createElement('input');
      subCheckbox.type = 'checkbox';
      subCheckbox.id = 'subtask-' + idx;
      const subLabel = document.createElement('label');
      subLabel.htmlFor = subCheckbox.id;
      subLabel.textContent = task.subtask;
      // Subtask points: default 5 points if not specified
      const subPoints = 5;
      const subPtsSpan = document.createElement('span');
      subPtsSpan.className = 'points';
      subPtsSpan.textContent = ` (+${subPoints})`;
      subLabel.appendChild(subPtsSpan);
      subTaskDiv.appendChild(subCheckbox);
      subTaskDiv.appendChild(subLabel);
      tasksContainer.appendChild(subTaskDiv);
      // Event for subtask completion
      subCheckbox.addEventListener('change', function () {
        if (subCheckbox.checked) {
          updateScore(participantName, subPoints);
          if (messageEl) messageEl.textContent = getRandomMessage();
        }
      });
    }
  });
  // Initialize scoreboard listening
  renderScoreboard();
}

// Expose functions globally for HTML pages to call
window.loadTasks = loadTasks;
window.loadMessages = loadMessages;
window.setupPage = setupPage;