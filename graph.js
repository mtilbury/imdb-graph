$(document).ready(function() {
    // Get url parameters
    var url_text = window.location.href;
    var url = new URL(url_text);
    var imdb_id = url.searchParams.get("id");
    var num_seasons = url.searchParams.get("seasons");
    num_seasons = parseInt(num_seasons);

    // for each season, make api call for season ratings
    var seasons = Array(num_seasons);
    var counter = 0;
    for(var season = 1; season <= num_seasons; ++season){
        (function(season){

        // make api call and append each episode to list
        var api_call = "http://www.omdbapi.com/?i=" + imdb_id + "&Season=" + season.toString() + "&apikey=7934ac8e";
        console.log(api_call);
        $.getJSON(api_call, function(json) {
            console.log(json);
            // Add episode list to seasons array
            seasons[season - 1] = json.Episodes;
            ++counter;
            console.log(seasons);
            if(counter == num_seasons){
                write_table(seasons);
            }
        })
    })(season);
    }
})

function write_table(seasons){
    var table_def = "<table class=season style='width'>\n<tr>\n<th>Episode</th> \
                     <th>Rating</th>\n</tr></table>";

    var num_seasons = seasons.length;
    for(var season = 1; season <= num_seasons; ++season){
        $('#list').append('<h3>Season ' + season + '</h3>');
        $('#list').append(table_def);
        var table = $('table:last');

        for(var episode = 1; episode <= seasons[season-1].length; ++episode){
            // div_list.append('<tr>');
            // div_list.append('<td>' + seasons[season-1][episode-1].Title + '</td>');
            // div_list.append('<td>' + seasons[season-1][episode-1].imdbRating + '</td>');
            // div_list.append('</tr>');
            table.append('<tr><td>' + seasons[season-1][episode-1].Title + '</td><td>' + seasons[season-1][episode-1].imdbRating + '</td>' + '</tr>');
        }
    }
}