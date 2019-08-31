//https://www.youtube.com/watch?v=ri5Nqe_IK50  <= here is example what i used for this task

window.onload = () => { tableBuild() };

//table data
const GOODS = [
  {
    category: 'furniture',
    name: 'Chair',
    amount: 1,
    price: 20
  },
  {
    category: 'supplies',
    name: 'Gel Pen',
    amount: 20,
    price: 2
  },
  {
    category: 'other',
    name: 'Trash Bin',
    amount: 1,
    price: 5
  },
  {
    category: 'furniture',
    name: 'Sofa',
    amount: 1,
    price: 50
  },
  {
    category: 'supplies',
    name: 'Notebook',
    amount: 3,
    price: 3
  },
  {
    category: 'other',
    name: 'Calendar 2019',
    amount: 1,
    price: 3
  }
];

let suffleDirection = false; //normal or reverse sort
let currentFieldName = ''; //name of the clicked field in the head of the table

//main function
/**
 * get name of the field > look if need reverse > make sort by current field > rebuild table > bind reverse sort trigger to current field name
 * @param {name of the clicked field} fieldName 
 */
function tableShuffleBy(fieldName) {

  if(fieldName === currentFieldName) { // check for sort direction if user click twice to the same id
    suffleDirection = !suffleDirection;
  }

  tableSortBy(fieldName, suffleDirection);
  tableBuild();

  currentFieldName = fieldName; // set last clicked id name
}


/**
 * Sort function. 
 * @param {table wil be sorted by this field} fieldName 
 * @param {reverse option} reverse 
 */
function tableSortBy(fieldName, reverse) {

  /* result1,2 used for reverse sort*/
  let result1 = -1;
  let result2 = 1;

    if(reverse) {
      [result1, result2] = [result2, result1];
    }

    GOODS.sort((a,b) => (a[fieldName] < b[fieldName] ? result1 : a[fieldName] > b[fieldName] ? result2 : 0) );  
}

/**
 * Table build function.
 * Get table body from html > get table array from script > foreach rebuild > change body of the html table for new one
 */
function tableBuild() {
  const oldTable = document.getElementById('tableBody');
  let newTable = '';
  
  for(let atribute of GOODS) {
    newTable += `<tr><td>${atribute.category}</td><td>${atribute.name}</td><td>${atribute.amount}</td><td>${atribute.price}</td></tr>`;
  }
  oldTable.innerHTML = newTable;
}
