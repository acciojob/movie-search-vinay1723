import React from "react";
import { useState } from "react";
import "./../styles/App.css";
const KEY = "99eb9fd1";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.Search) {
          setError("Invalid movie name. Please try again.");
          setMovies([]);
        } else {
          setMovies(data.Search);
          setError("");
        }
      })
      .catch(() => {
        setError("Invalid movie name. Please try again.");
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
      {movies.length > 0 && (
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
