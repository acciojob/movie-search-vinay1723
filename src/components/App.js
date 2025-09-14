import React from "react";
import { useState } from "react";
import "./../styles/App.css";
const KEY = "99eb9fd1";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  function handleSearch() {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
      .then((movies) => movies.json())
      .then((data) => {
        setMovies(data.Search);

        if (!data.Search) {
          setError("Invalid movie name. Please try again");
        } else {
          setError("");
        }
      })
      .catch((error) => {
        setError("Invalid movie name. Please try again");
        setMovies([]);
      });
  }

  return (
    <div>
      <form>
        <label htmlFor="searchBar">Search Movie</label>
        <br />
        <input
          id="searchBar"
          type="text"
          placeholder="movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </form>

      {error && <p className="error">{error}</p>}
      {movies && (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <Movie movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function Movie({ movie }) {
  return (
    <div>
      <h1>
        {movie.Title} ({movie.Year})
      </h1>
      <img src={movie.Poster} />
    </div>
  );
}

export default App;
