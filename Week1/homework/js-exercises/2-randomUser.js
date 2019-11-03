{
    "use strict";

// Exercise 2: Who do we have here ?

/* - Write a function that makes an API call to https://www.randomuser.me/api

   - Inside the same file write two functions: one with XMLHttpRequest, and the other with axios
   - Each function should make an API call to the given endpoint: https://www.randomuser.me/api
   - Log the received data to the console
   - Incorporate error handling

*/

//===== WITH XMLHttpRequest =====

let xhr = new XMLHttpRequest();
xhr.open("GET","https://www.randomuser.me/api");
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
.get("https://www.randomuser.me/api")
.then( function (response) {
    console.log(response.data);
} )
.catch( function(error) {
    console.log( error);
} )

}