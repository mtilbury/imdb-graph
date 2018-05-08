// Run script on load
$(document).ready(function() {
    // Get url parameters
    var url_text = window.location.href;
    var url = new URL(url_text);
    var imdb_id = url.searchParams.get("id");
    var num_seasons = url.searchParams.get("seasons");
    num_seasons = parseInt(num_seasons);

    // OMDb API can return episode ratings list for one season at a time
    // Need to go through number of seasons and make calls
    var seasons = Array(num_seasons);
    var counter = 0;

    for(var season = 1; season <= num_seasons; ++season){
        (function(season){
        // For each season, make an API call
        var api_call = "http://www.omdbapi.com/?i=" + imdb_id + "&Season=" + season.toString() + "&apikey=7934ac8e";
        console.log(api_call);
        $.getJSON(api_call, function(json) {
            console.log(json);

            // Add episode list to seasons array
            seasons[season - 1] = json.Episodes;
            ++counter;
            console.log(seasons);
            if(counter == num_seasons){
                draw_graph(seasons);
                write_table(seasons);
            }
        })
    })(season);
    }
})

function draw_graph(seasons){
    // Creates datasets for graph
    var datasets = [];
    var cum_ep = 0;
    seasons.forEach(function(season, s){
        var new_season = {};
        new_season.label = "Season " + s.toString();
        new_season.data = [];
        season.forEach(function(episode, e){
            var new_ep = {};
            new_ep.x = cum_ep;
            new_ep.y = episode.imdbRating;
            new_season.data.push(new_ep);
            ++cum_ep;
        });
        datasets.push(new_season);
    });

    console.log("drawing graph");
    var canvas = $("#graph")[0].getContext("2d");
    var chart = new Chart(canvas, {
        // Type of chart
        type: 'scatter',

        // Data
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}

function write_table(seasons){
    console.log("writing tables");
    // Definition of season table
    var table_def = "<table class=season style='width'>\n<tr>\n<th>Episode</th> \
                     <th>Rating</th>\n</tr></table>";

    // For each season, create a table of episode ratings
    var num_seasons = seasons.length;
    for(var season = 1; season <= num_seasons; ++season){
        $('#list').append('<h3>Season ' + season + '</h3>');
        $('#list').append(table_def);
        var table = $('table:last');

        // For each episode in season season, append row to table
        for(var episode = 1; episode <= seasons[season-1].length; ++episode){
            table.append('<tr><td>' + seasons[season-1][episode-1].Title + '</td><td>' + seasons[season-1][episode-1].imdbRating + '</td>' + '</tr>');
        }
    }
}