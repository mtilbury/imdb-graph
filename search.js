// This is pretty insecure
var key = "7934ac8e";

function searchShow(){
    // Retrieves text from input field and encodes it
    var text = $('#input').val();
    var encoded_text = encodeURIComponent(text);
    console.log(encoded_text);

    // Creates the URL used for API call
    var url = "http://www.omdbapi.com/?type=series&t=" + encoded_text + "&apikey=" + key;
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);
        // Check for errors
        if(json.Response == "False"){
            console.log("Show not found");
            window.location.href = "notfound.html";
        }
        else {
            // If found, go to graphing page with parameters
            console.log("Show found: " + json.Title);
            window.location.href = "graph.html?id=" + json.imdbID + "&seasons=" + json.totalSeasons; 
        }
    });
}