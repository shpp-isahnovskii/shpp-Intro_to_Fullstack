//https://www.youtube.com/watch?v=ri5Nqe_IK50  <= here is example what i used for this task

window.onload = () => { tableShuffleBy('category') };

//static table data
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

let FILTRED_GOODS = [];//changing table data

let suffleDirection = false; //normal or reverse sort
let currentFieldName = ''; //name of the clicked field in the head of the table

/**
 * ----------- Main function -----------
 * get name of the field > look if need reverse > make sort by current field > rebuild table > bind reverse sort trigger to current field name ?????????
 * @param {name of the clicked field} fieldName 
 */
function tableShuffleBy(fieldName) {
  
  if(fieldName === currentFieldName) { // check for sort direction if user click twice to the same id
    suffleDirection = !suffleDirection;
  }

  getSelectCategory();
  tableSortBy(FILTRED_GOODS, fieldName, suffleDirection);
  tableBuild(FILTRED_GOODS);
  addArrow(fieldName, suffleDirection);
  getCost(FILTRED_GOODS);

  currentFieldName = fieldName; // set last clicked id name
}



/**
 * ----------- Sort -----------
 * @param {get some table data to sort} table 
 * @param {table wil be sorted by this field} fieldName 
 * @param {reverse option} reverse 
 */
function tableSortBy(table, fieldName, reverse) {

  /* result1,2 used for reverse sort*/
  let result1 = -1;
  let result2 = 1;

    if(reverse) {
      [result1, result2] = [result2, result1];
    }

    table.sort((a,b) => (a[fieldName] < b[fieldName] ? result1 : a[fieldName] > b[fieldName] ? result2 : 0) );  
}

/** 
 * ----------- HTML table builder -----------
 * Get table body from html > get table array from script > foreach rebuild > change body of the html table for new one
 * @param {get some table data} table 
 */
function tableBuild(table) {
  const oldTable = document.getElementById('tableBody');
  let newTable = '';
  
  for(let atribute of table) {
    newTable += `<tr><td>${atribute.category}</td><td>${atribute.name}</td><td>${atribute.amount}</td><td>${atribute.price}</td></tr>`;
  }
  oldTable.innerHTML = newTable;
}

/** 
 * ----------- Filter -----------
 * Get inside of each '0' element of the table and search for category selected value
 */
function getSelectCategory() {
  let selectedValue = document.getElementById('selectionList').value;

  if(selectedValue == "") { //if value is empty - filter is not needed
    FILTRED_GOODS = GOODS;
  } else {
    FILTRED_GOODS = GOODS.filter( (item)=> { return Object.entries(item)[0][1] == selectedValue;}); //0 - category, 1 - category name
  }
}

/**
 * ----------- Total $ -----------
 * @param {current table} table 
 */
function getCost(table) { 
  let total = 0;
  for(let elem of table) {
    total += elem.price * elem.amount;
  }
  document.getElementById('total').innerHTML = `${total}$`;
}


/** 
 * ----------- arrows ▼ ▲-----------
 * Function add css class that print ▼ ▲ symbols; 
 * @param {current HTML id} id 
 * @param {boolean for arrow} arrowup 
 */
function addArrow(id, arrowup) {
  let thead = document.getElementById('tableHead').querySelectorAll('th'); //get all elements 'th' in table head
  
  for(element of thead){ //loop through
    element.className = "noarrow";
  }

  if(arrowup) {
    document.getElementById(id).className = "arrowup";
  } else {
    document.getElementById(id).className = "arrowdown";
  }
  
}
