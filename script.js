const categoryScreen = document.getElementById("categoryScreen");
const gameScreen = document.getElementById("gameScreen");
const categoryTitle = document.getElementById("categoryTitle");
const startWord = document.getElementById("startWord");
const optionsDiv = document.getElementById("options");
const message = document.getElementById("message");
const scoreBoard = document.getElementById("scoreBoard");
const scoreValue = document.getElementById("scoreValue");
const controls = document.getElementById("controls");

let score = 0;
let index = 0;
let questions = [];
let currentCategory = "";

const data = {
  fruits: [
    { start: "Apple", correct: "pie", emoji: "🍎", options: ["pie","tree","juice","jam"] },
    { start: "Pine", correct: "apple", emoji: "🍍", options: ["cone","apple","fruit","juice"] },
    { start: "Water", correct: "melon", emoji: "🍉", options: ["melon","drop","fruit","juice"] },
    { start: "Straw", correct: "berry", emoji: "🍓", options: ["berry","leaf","fruit","jam"] },
    { start: "Blue", correct: "berry", emoji: "🫐", options: ["berry","sky","water","fruit"] },
    { start: "Custard", correct: "apple", emoji: "🍎", options: ["apple","pie","tree","fruit"] },
    { start: "Mango", correct: "shake", emoji: "🥭", options: ["shake","tree","fruit","juice"] },
    { start: "Banana", correct: "split", emoji: "🍌", options: ["split","fruit","pie","jam"] },
    { start: "Coconut", correct: "water", emoji: "🥥", options: ["milk","water","tree","juice"] },
    { start: "Cherry", correct: "pie", emoji: "🍒", options: ["pie","fruit","jam","cake"] }
  ],

  animals: [
    { start: "Sea", correct: "horse", emoji: "🐴", options: ["horse","lion","fish","cat"] },
    { start: "Butter", correct: "fly", emoji: "🦋", options: ["bee","fly","ant","bug"] },
    { start: "Jelly", correct: "fish", emoji: "🐟", options: ["fish","cat","cow","bear"] },
    { start: "Star", correct: "fish", emoji: "⭐", options: ["fish","dog","cat","bird"] },
    { start: "Lady", correct: "bug", emoji: "🐞", options: ["bug","bird","fly","ant"] },
    { start: "King", correct: "fisher", emoji: "🐦", options: ["fisher","lion","bear","cat"] },
    { start: "Polar", correct: "bear", emoji: "🐻‍❄️", options: ["bear","dog","seal","penguin"] },
    { start: "Siberian", correct: "tiger", emoji: "🐯", options: ["tiger","lion","cat","leopard"] },
    { start: "Sea", correct: "lion", emoji: "🦭", options: ["lion","bear","seal","dog"] },
    { start: "Black", correct: "panther", emoji: "🐆", options: ["panther","tiger","leopard","lion"] }
  ],

  cities: [
    { start: "New", correct: "York", emoji: "🗽", options: ["Delhi","York","Paris","Rome"] },
    { start: "Los", correct: "Angeles", emoji: "🌴", options: ["Vegas","Angeles","Cabos","San"] },
    { start: "Hong", correct: "Kong", emoji: "🏙️", options: ["Kong","Land","City","Port"] },
    { start: "Cape", correct: "Town", emoji: "⛰️", options: ["Town","Bay","Port","City"] },
    { start: "Rio", correct: "de Janeiro", emoji: "🎉", options: ["de Janeiro","Bay","City","Land"] },
    { start: "San", correct: "Francisco", emoji: "🌉", options: ["Diego","Francisco","Jose","Antonio"] },
    { start: "Paris", correct: "City", emoji: "🗼", options: ["City","Town","Ville","Bourg"] },
    { start: "Tokyo", correct: "Metropolis", emoji: "🗾", options: ["Metropolis","Town","City","Port"] },
    { start: "London", correct: "City", emoji: "🇬🇧", options: ["City","Borough","Town","District"] },
    { start: "Dubai", correct: "Marina", emoji: "🏖️", options: ["Marina","City","Port","Bay"] }
  ],

  states: [
    { start: "Tamil", correct: "Nadu", emoji: "🗺️", options: ["Nadu","Land","State","Zone"] },
    { start: "Uttar", correct: "Pradesh", emoji: "🗺️", options: ["Bihar","Pradesh","Zone","Land"] },
    { start: "Madhya", correct: "Pradesh", emoji: "🗺️", options: ["Pradesh","State","Zone","Land"] },
    { start: "West", correct: "Bengal", emoji: "🗺️", options: ["Bengal","State","Land","Zone"] },
    { start: "Andhra", correct: "Pradesh", emoji: "🗺️", options: ["Pradesh","Land","State","Zone"] },
    { start: "Kerala", correct: "State", emoji: "🌴", options: ["State","Land","Zone","Region"] },
    { start: "Rajasthan", correct: "State", emoji: "🏜️", options: ["State","Land","Zone","Region"] },
    { start: "Punjab", correct: "Region", emoji: "🌾", options: ["Region","State","Land","Zone"] },
    { start: "Goa", correct: "State", emoji: "🏖️", options: ["State","Land","Zone","Region"] },
    { start: "Karnataka", correct: "State", emoji: "🌳", options: ["State","Land","Zone","Region"] }
  ],

  brands: [
    { start: "Kit", correct: "Kat", emoji: "🍫", options: ["Kat","Bit","Bat","Mat"] },
    { start: "Dairy", correct: "Milk", emoji: "🥛", options: ["Milk","Cream","Shake","Butter"] },
    { start: "Coca", correct: "Cola", emoji: "🥤", options: ["Cola","Pepsi","Fanta","Sprite"] },
    { start: "Pepsi", correct: "Cola", emoji: "🥤", options: ["Cola","Fanta","Coke","Sprite"] },
    { start: "Nike", correct: "Air", emoji: "👟", options: ["Air","Zoom","Max","Lite"] },
    { start: "Adidas", correct: "Neo", emoji: "👟", options: ["Neo","Run","Boost","Ultra"] },
    { start: "Mc", correct: "Donald", emoji: "🍔", options: ["Donald","King","Burger","Mouse"] },
    { start: "Star", correct: "bucks", emoji: "☕", options: ["bucks","coffee","brew","bean"] },
    { start: "Apple", correct: "Mac", emoji: "💻", options: ["Mac","Book","Air","Pro"] },
    { start: "Samsung", correct: "Galaxy", emoji: "📱", options: ["Galaxy","Note","Tab","S"] }
  ],

  tourist: [
    { start: "Taj", correct: "Mahal", emoji: "🕌", options: ["Palace","Mahal","Fort","Temple"] },
    { start: "Eiffel", correct: "Tower", emoji: "🗼", options: ["Tower","Gate","Bridge","Hill"] },
    { start: "Great", correct: "Wall", emoji: "🧱", options: ["Wall","Gate","Bridge","Tower"] },
    { start: "Niagara", correct: "Falls", emoji: "💦", options: ["Falls","River","Lake","Point"] },
    { start: "Statue", correct: "of Liberty", emoji: "🗽", options: ["of Liberty","Tower","Gate","Hill"] },
    { start: "Colosseum", correct: "Rome", emoji: "🏟️", options: ["Rome","Italy","City","Arena"] },
    { start: "Machu", correct: "Picchu", emoji: "⛰️", options: ["Picchu","Mountain","Fort","Site"] },
    { start: "Sydney", correct: "Opera", emoji: "🎭", options: ["Opera","House","Theatre","Building"] },
    { start: "Big", correct: "Ben", emoji: "🕰️", options: ["Ben","Clock","Tower","London"] },
    { start: "Christ", correct: "Redeemer", emoji: "✝️", options: ["Redeemer","Statue","Jesus","Mountain"] }
  ]
};

function startGame(category) {
  currentCategory = category;
  questions = data[category];
  index = 0;
  score = 0;
  scoreValue.textContent = score;

  categoryTitle.textContent = "🎯 " + category.toUpperCase();

  categoryScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  scoreBoard.classList.remove("hidden");
  controls.classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  if (index >= questions.length) {
    message.textContent = `🎉 Game Completed! Final Score: ${score}`;
    optionsDiv.innerHTML = "";
    return;
  }

  const q = questions[index];
  startWord.textContent = q.start;
  document.getElementById("emoji").textContent = q.emoji;
  message.textContent = "";
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[index];
  const fullWord = q.start + q.correct;

  if (selected === q.correct) {
    score++;
    scoreValue.textContent = score;
    message.textContent = `✅ Correct! ${fullWord}`;
  } else {
    message.textContent = `❌ Wrong! Correct Answer: ${fullWord}`;
  }

  index++;
  setTimeout(loadQuestion, 1200);
}

function restartGame() {
  startGame(currentCategory);
}

function goHome() {
  gameScreen.classList.add("hidden");
  controls.classList.add("hidden");
  scoreBoard.classList.add("hidden");
  categoryScreen.classList.remove("hidden");
}
