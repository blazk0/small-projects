const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .forEach((person, idx) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', idx);

      listItem.innerHTML = `
      <span class="number">${idx + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person.value}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
  `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIdx, toIdx) {
  const itemOne = listItems[fromIdx].querySelector('.draggable');
  const itemTwo = listItems[toIdx].querySelector('.draggable');

  listItems[fromIdx].appendChild(itemTwo);
  listItems[toIdx].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(drag => {
    drag.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(drag => {
    drag.addEventListener('dragover', dragOver);
    drag.addEventListener('drop', dragDrop);
    drag.addEventListener('dragenter', dragEnter);
    drag.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
