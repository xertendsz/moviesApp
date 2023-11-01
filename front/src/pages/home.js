import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Home({isAuthenticated}) {
    const [shows, setShows] = useState([])
    const [input, setInput] = useState("")
    const [display, setDisplay] = useState(false)
    const [movieName, setMovieName] = useState("")
    const [movieData, setMovieData] = useState({})
    const postMovie = {
        title: movieData.Title,
        year: movieData.Year || "",
        runtime: movieData.Runtime || "",
        type: movieData.Type || "",
        poster: movieData.Poster || "",
    }
    const { userId, humanId } = useParams();
    const theId = localStorage.getItem("userId")

    useEffect(() => {
        if (movieName) {
            fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=3244219b`)
                .then(response => response.json())
                .then(data => {
                    setMovieData(data);
                    console.log(userId);
                });
        }
    }, [movieName]);

    const fetchMovies = (query) => {
        fetch(`http://www.omdbapi.com/?s=${query}&apikey=3244219b`)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    const lastFiveMovies = data.Search.slice(-10);
                    setShows(lastFiveMovies);
                }
            });
    };

    const addWatched =  async () => {
        console.log(humanId);
        try {
            const response = await axios.post(`http://localhost:3000/watched/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
            })
        } catch (err) {
            console.error("Axios Error: " + err)
        }
    }

    const addWatchlist =  async () => {
        console.log(humanId);
        try {
            await axios.post(`http://localhost:3000/watchlist/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
            })
        } catch (err) {
            console.error("Axios Error: " + err)
        }
    }

    const addTop =  async () => {
        console.log(humanId);
        try {
            const response = await axios.post(`http://localhost:3000/top/${userId}`, postMovie, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
            })
        } catch (err) {
            console.error("Axios Error: " + err)
        }
    }
    

    const handleInput = (e) => {
        const query = e.target.value;
        setInput(query);
        fetchMovies(query);
        setDisplay(false);
    }

  return (
    <div>
        <div className="movie">
            <h1 className='home-title'>Find Movies, TV shows and more...</h1>
            <input className='searchField' type="text" onChange={handleInput} name="findMovie" value={display?movieName:null} placeholder='Find a show' id="" />
            {input && shows.length > 0 && display === false?
                <div className='big-scroll'>
                    {shows.map((show, index) => (
                        <div key={index} className='scroll' onClick={() => {/*console.log(show.title)*/; setMovieName(show.Title); setDisplay(true)}}>
                            <div className="image">
                                <img src={show.Poster ? show.Poster : null} width="60px" height="80px" alt="" />
                            </div>
                            <div className="text">
                                <h4>{show.Title}</h4>
                                <div className="small">
                                    <p>{show.Year}</p>
                                    <p>-</p>
                                    <p>{show.Type? show.Type[0].toUpperCase() + show.Type.slice(1, show.Type.length) : null}</p>
                                    <p style={{display: "none"}}>{show.Released}{show.imdbRating}</p>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div> 
                : 
                (display?
                <div className='movie-container'>
                    <h2 name='title'>{movieData.Title}</h2>
                    <div className='movie-card'>
                        <div className="left-container">
                            <div className="left-small">
                                <p name='type'>{movieData.Type? movieData.Type[0].toUpperCase() + movieData.Type.slice(1, movieData.Type.length) : null}</p>
                                <p name='year'>{movieData.Released}</p>
                                <p name='runtime'>{movieData.Runtime}</p>
                            </div>
                            <div className="left-big">
                                <img className='poster-image' src={movieData.Poster} alt="" />
                                <div className="genres">
                                    {movieData.Genre ? movieData.Genre.split(', ').map((genre, key) => {
                                        return (
                                            <p className="genre" index={key}>{genre}</p>
                                        )
                                    }): null}
                                </div>
                                    
                            </div>
                        </div>
                        <div className="right-container">
                            <div className='right-small'>
                                {movieData.imdbRating?
                                <p>IMDb Rating<br/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    {movieData.imdbRating}/10
                                </p>:null
                                }
                                {/*<p>Your Rating:</p>*/}
                            </div>
                            <div className="right-big">
                                <p><span className='span-title'>Director: </span>{movieData.Director}<hr/></p>
                                <p><span className='span-title'>Writer: </span>{movieData.Writer}<hr/></p>
                                <p><span className='span-title'>Actors: </span>{movieData.Actors}<hr/></p>
                                <p>{movieData.Plot}<hr/></p>
                                <p><span className='span-title'>Country: </span>{movieData.Country}</p>
                            </div>
                        </div>
                    </div>
                    {theId !== null &&
                    <div className="three-buttons">
                        <button onClick={addWatched} className="add-watched round-button">
                        <svg className="the-eye w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                        </svg>
                        </button>
                        <button onClick={addWatchlist} className="add-watchlist round-button">
                            +
                        </button>
                        <button onClick={addTop} className="add-top round-button">
                            100
                        </button>
                    </div>
                    }
                </div>
            : null)
            }
        </div>
    </div>
  )
}
