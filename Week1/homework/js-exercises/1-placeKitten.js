{
    "use strict";

// Exercise 1: Place the kitten

/* - Write a function that makes an API call to https://wwww.placekitten.com/api (it doesn't work so I used https://dog.ceo/api/breeds/image/random)
   - Inside the same file write two programs: one with XMLHttpRequest, and the other with axios
   - Each function should make an API call to the given endpoint
   - Log the received data to the console
   - Incorporate error handling

*/

//===== WITH XMLHttpRequest =====

let xhr = new XMLHttpRequest();
xhr.open("GET","https://dog.ceo/api/breeds/image/random");
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
        console.log(JSON.parse(xhr.responseText));
    } else {
        console.log('Error! server response status:', xhr.status);
    }
};

xhr.onerror = function () {
    console.log ("Error ! Can not connect to server.");
}

xhr.send();

//===== WITH AXIOS =====

axios
.get("https://dog.ceo/api/breeds/image/random")
.then( function (response) {
    console.log(response.data);
} )
.catch( function(error) {
    console.log( error);
} )

}