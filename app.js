const $ = require("jquery");
require("materialize-css");
M.AutoInit();
var cpt = 1;
getCard();

function getCard() {
  // Récupère des infos et remplit la card
  fetch("https://jsonplaceholder.typicode.com/users/" + cpt)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      $(".card-content > span").text("");
      $(".card-content > span").append(json.name);
      $(".card-reveal > span").text("");
      $(".card-reveal > span").append(json.name);
      $.each(json, function(index, value) {
        if ($("div.description ." + index).length != 0) {
          $("div.description ." + index).text("");
          $("div.description ." + index).append(value);
        }
        if (index === "address") {
          $.each(json.address, function(index, value) {
            if ($("#address ." + index).length != 0) {
              $("#address ." + index).text("");
              $("#address ." + index).append(value);
            }
            if (index === "geo") {
              let link =
                "http://www.google.com/maps/place/" +
                value.lat +
                "," +
                value.lng;
              $("#address a").attr("href", link);
            }
          });
        }
        if (index === "company") {
          $.each(json.company, function(index, value) {
            if ($("#company ." + index).length != 0) {
              $("#company ." + index).text("");
              $("#company ." + index).append(value);
            }
          });
        }
      });
    })
    .catch(function(error) {
      M.toast({html: 'Error occured...', classes: 'rounded'});
      console.log(error);
    });
  // Récupère une image
  fetch("https://jsonplaceholder.typicode.com/photos/" + cpt)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      $("img").attr("src", json.thumbnailUrl);
    })
    .catch(function(error) {
      M.toast({html: 'Error occured...', classes: 'rounded'});
      console.log(error);
    });
}

$("button.btn[name='next']").click(function() {
  cpt++;
  getCard();
});
$("button.btn[name='previous']").click(function() {
  cpt > 1 ? cpt-- : M.toast({html: 'No card here !', classes: 'rounded'});
  getCard();
});

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}