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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // per azzerare il container

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    // insertAjacentTHTML method --> for inserting HTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance} €`;
};
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// Add the username in the Object based on the owner name
const createUsername = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // This prevents form from submitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur(); // The field loses its focus

    updateUI(currentAccount);
  }
});

// Transfer Money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clean input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  // Check if the amount is positive and if there is enough money
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Add negative movement to current user
    currentAccount.movements.push(-amount);
    // Add positive movement to receiver user
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// Request a Loan (if there is at least 1 deposit with at least 10% of the requested loan amount)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Close account (delete the account object from the accounts array)
// To delete the account from the Array we use the splice method, but to delete it we need the index --> findIndex Method
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Remove account
    accounts.splice(index, 1);
    // Hide the UI
    containerApp.style.opacity = 0;
  }
  // Clean input fields
  inputCloseUsername.value = inputClosePin.value = '';
});

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

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const dogsJuliaCorrected = dogsJulia.slice(1, -2); // Shallow copy without the cats

const checkDogs = function (arr1, arr2) {
  const arrayDogs = [...dogsJuliaCorrected, ...dogsKate];

  arrayDogs.forEach(function (dog, i) {
    let type = dog > 3 ? 'adult' : 'puppy';
    console.log(type);
    if (type === 'adult') {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(
        `Dog number ${i + 1} is still a puppy, and is ${dog} years old`
      );
    }
  });
};

checkDogs(dogsJuliaCorrected, dogsKate);
*/

// ARRAY METHODS: MAP, FILTER, REDUCE
// A. ARRAY METHOD: MAP
// Method that we can use to loop over Arrays (similar to the forEach), but it CREATES A NEW ARRAY based on the original array
// In the callback function it specifies a function to be applied to each element of the original array

// B. ARRAY METHOD: FILTER
// Used to filter for elements in the original Array that satisfy a certain condition and CREATES A NEW ARRAY

// C. ARRAY METHOD: REDUCE
// Used to reduce all array elements down to one single value (example: ADDING ALL ELEMENTS TOGETHER)
// No new array, only the reduced value

/* 02. THE MAP METHOD */
// Convert the movements from euro to USD
/*

const eurToUsd = 1.1;
const movementsUsd = movements.map(function (movement) {
  return movement * eurToUsd;
});
console.log(movements);
console.log(movementsUsd);

// Stessa cosa con forEach:
const movementsUsdFor = [];
for (const mov of movements) movementsUsdFor.push(mov * eurToUsd);

// Replace the callback with an arrow function:
const movementsUsdArrow = movements.map(movement => movement * eurToUsd);
console.log(movementsUsdArrow);

const movementDescriptions = movements.map(
  (movement, index) =>
    `Movement ${index + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)} dollars`
);
console.log(movementDescriptions);
*/

/* THE FILTER METHOD to filter for elements that satisfy a certain condition */
/*
const deposits = movements.filter(function (movement) {
  return movement > 0;
});

const withdrawals = movements.filter(movement => movement < 0);
*/

// 03. THE REDUCE METHOD
/*
// Accumulator is like a snowball
const balance = movements.reduce(function (
  accumulator,
  currentItem,
  currentIndex,
  array
) {
  return accumulator + currentItem;
},
0); // We have to specify the initial value of the accumulator!

// Arrow function: const balance = movements.reduce((acc, mov) => acc + mov, 0);

// Maximum value of the movement array
const maxValue = movements.reduce(function (acc, mov) {
  if (mov > acc) {
    acc = mov;
  }
  return acc;
}, movements[0]);
console.log(maxValue);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);

  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

// CHAINING METHODS
// Take all the deposits, convert in USD e add up
/*
const eurToUsd = 1.1;
const totalDepositsInUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsInUsd);
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
// THE FIND METHOD - to find exactly one element
// We can use the find method to retrieve one element of the Array based on a condition
// It will not return a new Array but only the first element of the Array that satisfy the condition

console.log(movements.find(mov => mov < 0));

// Useful to find an element in a big Array that has a determined characteristic
const account = accounts.find(acc => (acc.owner = 'Jessica Davis'));
console.log(account);
*/

// THE FINDINDEX Method - It works like find but it returns the index of the found element

// THE SOME METHOD - test for a condition
// includes method gives a boolean true/false if the condition is true (example: array includes 100)
// We want to know if there was any deposits in the account (any positive movement)
/*
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// THE EVERY METHOD - it only returns true if ALL the elements in the callback function satisfy the fuction
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0; // Si può usare per ogni callback function!!
*/
