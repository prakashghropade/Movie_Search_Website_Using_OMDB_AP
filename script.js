// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');


// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=d214af8`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

// find the movies 
function findMovies() {
  let searchTerm = (movieSearchBox.value).trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');
    loadMovies(searchTerm);
  } else {
    searchList.classList.add('hide-search-list');
  }
}


// display the movies list 
function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add('search-list-item');
    if (movies[idx].Poster != "N/A")
      moviePoster = movies[idx].Poster;
    else
      moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

// load the movies details 
function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search-list-item');
  searchListMovies.forEach(movie => {
    movie.addEventListener('click', async () => {
      searchList.classList.add('hide-search-list');
      movieSearchBox.value = "";
      const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=d214af8`);
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);

    });
  });
}

//  Display movies Details
function displayMovieDetails(details) {
  console.log(details);
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Ratings[0].Value}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        <button class = "fav_btn" id = "fav_btn">Add To Favorites</button>
    </div>
    `;


  let movieList = [];

  // Get the Data form the localstorage and saved into movieList which is empty array
  function initializeMovieList() {
    if (localStorage.getItem("movieList")) {
      movieList = JSON.parse(localStorage.getItem("movieList"));
    }
  }

  // Save the data into the localstorage
  function saveMovieList() {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }

  initializeMovieList();

  // Function which add the movies to the favorite list
  function addToFavorites(details) {
    let poster =
      details.Poster !== "N/A" ? details.Poster : "image_not_found.png";
    let title = details.Title;
    let id = details.Id;
    let favMovie = {
      poster: poster,
      title: title,
      id: id
    };

    let flage = false;
    for (let i = 0; i < movieList.length; i++) {

      if (favMovie.title == movieList[i].title) {
        flage = true;
      }
    }

    if(flage == true){
      alert("The movie is already exist in the list");
    }
    else{
      movieList.push(favMovie);
      saveMovieList() ;
      alert("One movie is added to the list");
    }


  }

// when user click on the "Add to the Favorite Button" the perticular movie is added into the Favorite
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("fav_btn")) {
      e.preventDefault();
      let movieDetails = {
        Poster: details.Poster,
        Title: details.Title,
        Id: details.imdbID
      };
      addToFavorites(movieDetails);
    }
  });

}



