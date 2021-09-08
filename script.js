const draggleList = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerburg',
  'Mickael Bloomberg',
  'Larry Page'
];

// store List Items
const listItems = [];

let dragStartIndex;

createList();

// Create List Items
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number" >${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem);
      draggleList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log('dragStartIndex', dragStartIndex);
}

function dragEnter() {
  // console.log('Event', 'dragenter');

  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTow = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTow);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      item.classList.remove('right');
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  })
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);