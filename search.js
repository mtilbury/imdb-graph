// This is pretty insecure
var key = "7934ac8e";

function searchShow(){
    // Retrieves text from input field and encodes it
    var text = $('#input').val();
    var encoded_text = encodeURIComponent(text);
    console.log(encoded_text);
    alert("You entered: " + text);

    // Creates the URL used for API call
    var url = "www.omdbapi.com/?t=" + encoded_text + "&apikey=" + key;
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);
    });
}