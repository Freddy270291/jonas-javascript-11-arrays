'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// 01. SIMPLE ARRAY METHODS
/*
// Arrays methods are functions that are attached to all arrays that we create
// Arrays are Objects that get access to special build-in methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE METHOD - we can extract part of any array without changing the original array:
console.log(arr.slice(2)); // index at which we start extracting, it returns a new array
console.log(arr.slice(2, 4)); // we can specify the last value
console.log(arr.slice(-2)); // We can definy a negative number, it starts from the last element
console.log(arr.slice(1, -1)); // We can use the negative number also for the last element of the new array
console.log(arr.slice()); // We can use the slice method to create a shallow copy of the array
console.log([...arr]); // We can create a new copy by creating a new array and expanding (...) the original array

console.log(arr); // It doesn't change the original Array!

// SPLICE METHOD - Similar to the slice method, BUT it does change the original array
// console.log(arr.splice(2));
// console.log(arr); // the original array is changed! The extracted elements are gone!

// Most of the times, we use the Splice method to delete element from the Array (we don't care about the new array that we create)
arr.splice(-1); // We eliminate the last element of the Array
console.log(arr);
arr.splice(1, 2); // We delete 2 elements starting from position 1
console.log(arr);

// REVERSE() - it reverses the order of the Array. It MUTATES the original array!
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // The original array is mutated

// CONCAT() - Used to concatenate 2 arrays. It DOESN'T mutate the original Array

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // Other way to do this

// JOIN() - to join the elements of the array with the parameter we insert (the result is a String)
console.log(letters.join(' - '));
*/

// 02. LOOPING ARRAYS: ForEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// We want to loop over these movements in order to print a message for each of them
/*
// With For ... of ... :
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement} dollars`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${movement * -1} dollars`);
  }
}
*/

// With forEach (Callback function):
/*
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement} dollars`);
  } else {
    console.log(`You withdrew ${movement * -1} dollars`);
  }
});

// Accessing to the current index: we can specify it in the parameter list
movements.forEach(function (movement, index, array) {
  // It matters the order: (current element, index, entire array)
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement} dollars`);
  } else {
    console.log(
      `Movement ${index + 1}: You withdrew ${Math.abs(movement)} dollars`
    );
  }
});

// Differences: You can NOT break out from a forEach loop
*/

// 03. forEach METHOD WITH MAPS AND SETS:
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  // same thing as normal array (current value, index, map)
  console.log(`${key}: ${value}`);
});

// SET:
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  // a SET doesn't have keys and indexes!
  console.log(`${key}: ${value}`);
});
*/

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////  BANKIST APP ///////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
