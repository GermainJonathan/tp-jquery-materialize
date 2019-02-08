const $ = require("jquery");
require("materialize-css");

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(json => {
    console.log(json);
  });