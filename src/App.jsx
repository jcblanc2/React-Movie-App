import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState('');

  const API_URL = "http://www.omdbapi.com?apikey=6e8297f5";

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>Flixland</h1>

      <div className="search">
        <input
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <img src={SearchIcon} alt="Search" onClick={() => searchMovies(keyword)} />
      </div>

      {movies?.length > 0 ?
        (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.Poster + movie.Title + movie.Year} />
            ))}
          </div>
        ) :
        (
          <div className="empty">No movies found.</div>
        )}
    </div>
  );
}

export default App;
