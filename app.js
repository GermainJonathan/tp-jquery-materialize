const $ = require("jquery");
require("materialize-css");
M.AutoInit();
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    $(".card-content > span").append(json.name);
    $(".card-reveal > span").append(json.name);
    $.each(json, function(index, value) {
      if ($("div.description ." + index).length != 0) {
        $("div.description ." + index).append(value);
      }
      if(index === "address") {
        $.each(json.address, function(index, value) {
          if ($("#address ." + index).length != 0) {
            $("#address ." + index).append(value);
          }
          if(index === "geo") {
            $("#address .link").href = $("#address .link").href + value.lat + "," + value.lng;
          }
        });
      }
    });
  });
fetch("https://jsonplaceholder.typicode.com/photos/1")
  .then(response => response.json())
  .then(json => {
    $("img").attr('src', json.thumbnailUrl);
  });
