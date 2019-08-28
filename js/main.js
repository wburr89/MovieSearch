//  Gets user input from search box
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});
//  Retrieves user inquiry from API
function getMovies(searchText) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=e6f03914c8be0ff64189d7995fe10c3d&query=' + searchText)
        // Returns promise
        .then((response) => {
            if (response.data.results == '') {
                alert('Sorry, We could not find a matching title. Please Try again!');
            }
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
                // Prints API data to index.html
                output += `
                    <div class='col-md-3'>
                        <div class='well text-center'>
                            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}">
                            <h5>${movie.title}</h5>
                            <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href='movie.html'>Movie Details</a>
                            <p>Rating: ${movie.vote_average}</p>
                        </div>
                    </div>
                `
            });
            $('#movies').html(output);
        })
        //  Error handling
        .catch((err) => {
            console.log(err);
        });
}


function popularTitles(popularDetails) {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e6f03914c8be0ff64189d7995fe10c3d&region=US')
        .then((response) => {
            if (response.data.results == '') {
                alert('Sorry, We could not find a matching title. Please Try again!');
            }
            console.log(response);
            let popularMovies = response.data.results;
            let output = '';
            $.each(popularMovies, (index, popular) => {
                output += `
                    <div class='col-md-3'>
                        <div class='well text-center'>
                            <img src="https://image.tmdb.org/t/p/original/${popular.poster_path}">
                            <h5>${popular.title}</h5>
                            <p>Rating: ${popular.vote_average}</p>
                        </div>
                    </div>
                `
            });
            $('#hotMovies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
       
}
    //  Stores movie id, not stored when browser closes
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false;
}

//  Gets stored ID
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=e6f03914c8be0ff64189d7995fe10c3d")
        // Returns promise
        .then((response) => {
            console.log(response);
            let movie = response.data;
            console.log(movie);

            let output = `
                <div class='row'>
                    <div class='col-md-4'>
                        <img src='https://image.tmdb.org/t/p/w342/${movie.poster_path}' class='thumbnail'>
                    </div>
                    <div class='col-md-8'>
                        <h2>${movie.title}</h2>
                        <span class='grn-text'>${movie.tagline}</span>
                        <ul class='list-group'>
                            <li class='list-group-item'><strong>Genre:</strong> ${movie.genres[0].name}</li>
                            <li class='list-group-item'><strong>Release Date:</strong> ${movie.release_date}</li>
                            <li class='list-group-item'><strong>Run Time:</strong> ${movie.runtime} Minutes</li>
                            <li class='list-group-item'><strong>Rating:</strong> ${movie.vote_average}/10</li>
                            <li class='list-group-item'><strong>Homepage:</strong> <a href=${movie.homepage} target='_blank'>Visit the ${movie.title} Homepage</a></li>
                            <li class='list-group-item'><strong>Produced By:</strong> ${movie.production_companies[0].name}</li>
                        </ul>
                    </div>
                </div>

                <div class='row'>
                    <div class='well plot-spacing'>
                        <h3>Plot</h3>
                        ${movie.overview}
                        <hr>
                        <a href='https://www.themoviedb.org/movie/${movie.id}?language=en-US' class='btn btn-primary' target='_blank'>View more</a>
                        <a href='index.html' class='btn btn-success'>Search again</a>
                    </div>
                </div>
            `
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
