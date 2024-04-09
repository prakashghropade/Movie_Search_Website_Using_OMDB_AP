let desc = document.getElementById("add_movie");
let movieList = JSON.parse(localStorage.getItem("movieList"));
const fav_continer = document.getElementById("fav_contain");

if (movieList == null) {
    desc.innerHTML = "You can add the movies Here !!!"
}
else {
    desc.innerHTML = "Select the Movies for Movies Details !!!"
}

for (let i = 0; i < movieList.length; i++) {

    let movieListItem = document.createElement('div');
    movieListItem.classList.add('cards');
    movieListItem.innerHTML = ` 


 <div class="image" >
    <img src="${movieList[i].poster}"  onclick= "loadDetails('${movieList[i].id}')"
        class="card-img-top" alt="...">
    </div>

    <div class="title">
        <h5 class="card-title">${movieList[i].title}</h5>
    </div>
      
    <div class="des">
        <button id="btn"   class = "${movieList[i].title}" onclick="removeMovie(${i})">Remove form Favorite</button>
    </div> 
 `;
    fav_continer.appendChild(movieListItem);

}




function removeMovie(index) {
    let movieList = JSON.parse(localStorage.getItem("movieList"));
    movieList.splice(index, 1);
    localStorage.setItem("movieList", JSON.stringify(movieList));
    location.reload();

}


document.getElementById("clear").addEventListener("click", (e) => {

    if (movieList.length > 0) {
        let a = window.confirm("You want to remove all the movies from the Favorites");
        if (a == true) {
            localStorage.clear();
        }
        location.reload();
    }
    else {
        alert("There is NO Movies in the Favorite Movies")
    }

})


async function loadDetails(imdbid) {

    console.log("Error");
    const result = await fetch(`http://www.omdbapi.com/?i=${imdbid}&apikey=d214af8`);
    const movieDetails = await result.json();
    displayMovieDetails1(movieDetails);


}

function displayMovieDetails1(details) {
    // let resultGrid = document.getElementById("result-grid");
    resultGrid.innerHTML = `
<div class = "movie-poster">
<img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
</div>
<div class = "movie-info">
<h6 class = "movie-title">${details.Title}</h6>

<div class="info">
<div class="firstInfo">
<p class = "year1"> <i><b><u>Year:</u></b></i> ${details.Year}</p>
<p class = "rated1"><i><b><u>Ratings:</u></b></i> ${details.Ratings[0].Value}</p>
<p class = "released1"><i><b><u>Released:</u></b></i> ${details.Released}</p>
<p class = "genre1"><i><b><u>Genre:</u></b></i> ${details.Genre}</p>
<p class = "awards1"><i><b><u>Awards:</u></b></i> ${details.Awards}</p>
</div>
<div class="secondInfo">
<p class = "writer1"><i><b><u>Writer:</u></b></i> ${details.Writer}</p>
<p class = "actors1"><i><b><u>Actors:</u></b></i>${details.Actors}</p>
<p class = "plot1"><i><b><u>Plot:</u></b></i> ${details.Plot}</p>
</div>
</div>
</div>
`;

}