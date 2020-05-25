const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUsers);
showMillionaires.addEventListener('click', showMillionairesOnly);
calculateWealthBtn.addEventListener('click', calculateWealth);

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2,
    };
  });

  updateDOM();
}

function sortUsers() {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function showMillionairesOnly() {
  data = data.filter(user => user.money >= 1000000);

  updateDOM();
}

function calculateWealth() {
  const total = data.reduce((acc, curr) => {
    return (acc += curr.money);
  }, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

function addData(user) {
  data.push(user);

  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(
      user.money
    )}`;

    main.appendChild(element);
  });
}

function formatMoney(money) {
  return '$' + Number(money).toLocaleString();
}

getRandomUser();
getRandomUser();
getRandomUser();
