{
    "use strict";

// Exercise 3: Photo gallery

/* - Write a function that makes an API call to https://picsum.photos/400

   - Create an index.html file that will display your random image
   - Write two programs: one with XMLHttpRequest, and the other with axios
   - Each function should make an API call to the given endpoint: https://picsum.photos/400
   - After receiving the data, render it to the page in a <img>
   - Incorporate error handling

*/

//===== WITH XMLHttpRequest =====

let xhr = new XMLHttpRequest();
xhr.open("GET","https://picsum.photos/400");
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
        const image = document.createElement('img');
        document.body.appendChild(image);
        image.setAttribute("id",'xhr');
        //document.getElementById("xhr").setAttribute("src", xhr.responseURL);
        image.setAttribute("src", xhr.responseURL);
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
.get("https://picsum.photos/400")
.then( function (response) {
    const image = document.createElement('img');
        document.body.appendChild(image);
        image.setAttribute("id",'axios');
        //document.getElementById("axios").setAttribute("src", response.request.responseURL);
        image.setAttribute("src", response.request.responseURL);
} )
.catch( function(error) {
    console.log( error);
} )

}