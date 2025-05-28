// Инициализация VK
vkBridge.send('VKWebAppInit');

let score = 0;
let upgradeLevel = 0;
let upgradeCost = 10;
let pointsPerClick = 1;

// DOM элементы
const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeLevelDisplay = document.getElementById('upgrade-level');
const upgradeCostDisplay = document.getElementById('upgrade-cost');

clickBtn.addEventListener('click', () => {
  score += pointsPerClick;
  updateDisplay();
  vkBridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' });
});

upgradeBtn.addEventListener('click', () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    upgradeLevel++;
    pointsPerClick++;
    upgradeCost = Math.floor(upgradeCost * 1.6);

    // Меняем текст апгрейда в зависимости от уровня
    let upgradeName = getUpgradeName(upgradeLevel);
    upgradeBtn.innerHTML = `${upgradeName} (+1 болт за клик) — <span id="upgrade-cost">${upgradeCost}</span> болтов`;

    updateDisplay();
  } else {
    vkBridge.send('VKWebAppTapticNotificationOccurred', { type: 'error' });
  }
});

function updateDisplay() {
  scoreDisplay.textContent = score;
  upgradeLevelDisplay.textContent = upgradeLevel;
  document.getElementById('upgrade-cost').textContent = upgradeCost;
}

function getUpgradeName(level) {
  const names = [
    '🟢 Мятный капот',
    '✨ Люстра на крышу',
    '🧼 Чехлы от Жигулей',
    '💥 Спойлер из оцинковки',
    '🎨 Аэрография «Волк»',
    '🚀 Карбюратор с Озона'
  ];
  return names[level % names.length] || '🚘 Улучшение';
}
