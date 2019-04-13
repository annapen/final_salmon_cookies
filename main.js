'use strict'

// use the document.getElementById so that it will "link"/"match" to the html 
let elStoreTable = document.getElementById('storetable')
let elForm = document.getElementById('store-form')

// declare the variables and assign their values with an array for their store hours. Assign their values as STRINGS. 
let hours = ['6am','7am','8am','9am','10am','11am']
let stores = []

// New variable is declared using the constructor funtion! :D 
let CookieStore = function(name, min, max, sold) {
    this.storeName = name 
    this.minCustomer = min 
    this.maxCustomer = max 
    this.cookiesPerCustomer = sold 
}

// Now, use the prototype method on the CookieStore constructor funcaiton. It will return a random number between the min and the max customers multiplied by the number of cookies per customer. 
CookieStore.prototype.cookiesSoldPerHour = function() {
    let randomNumber = Math.ceil(Math.random() * (this.maxCustomer - this.minCustomer) + this.minCustomer)
    return randomNumber * this.cookiesPerCustomer
}

// Create new refrences to the store locations using CookieStores object constructor 
let Pike = new CookieStore ('Pike', 23, 65, 6)
let Seatac = new CookieStore ('Seatac', 3, 23, 2)
let Seacenter = new CookieStore ('Seacenter', 11, 38, 4)
let Capital = new CookieStore ('Capital', 20, 38, 3)
let Alki = new CookieStore ('Alki', 2, 16, 5)

// Push these new instances/occurances to the end of our stores array
stores.push(Pike, Seatac, Seacenter, Capital, Alki)

// New row is created for the header using createElement - it includes the column title 
let elHeader = document.createElement('tr')
elStoreTable.appendChild(elHeader)
let elTh = document.createElement ('th')
elHeader.appendChild(elTh)
elTh.innerText = 'Store Name'
//loop through our hours array and display each hour as a table header element 
for(let i = 0; i < hours.length; i++) {
    let elTh = document.createElement('th')
    elHeader.appendChild(elTh)
    elTh.innerText = hours[i]
} 

// using the prototype methods with the cookiestore constructor to generate new rows for each store and populate the row with a random number returned from the cookiesSoldPerHour prototype method 
CookieStore.prototype.renderNewStore = function() {
    let elRow = document.createElement('tr')
    elStoreTable.appendChild(elRow)
    let elTh = document.createElement('th')
    elRow.appendChild(elTh)
    elTh.innerText= this.storeName
    for(let i = 0; i < hours.length; i++) {
        let elTd = document.createElement('td')
        elRow.appendChild(elTd)
        elTd.innerText = this.cookiesSoldPerHour()
    }
} 

// Here we will loop through the stores' array and utlize rendernewstore method to generate a new row on our table 
for(let j = 0; j < stores.length; j++){
    stores[j].renderNewStore()
}

//access our inputs on our form through dot notation 
let elNameOfStore = elForm.nameOfStore
let elMinCustomer = elForm.minCustomer

//Event Listener created with the prevent default to hold for instruction. Event will "listen" for the "submit" event and create a new instance of our constructor function using the values collected from our form
elForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let newStore = new CookieStore(elNameOfStore.value, parseInt (elMinCustomer.value), 65, 4)
    stores.push(newStore)

    // use renderNewStore methos on our new store to add a new tow to the table
    newStore.renderNewStore()
})