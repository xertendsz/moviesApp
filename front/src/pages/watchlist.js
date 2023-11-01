import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Watchlist() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [watchlist, setwatchlist] = useState([])
  const [error, setError] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/watchlist/${userId}`)
    .then(response => {
      console.log(response.data)
      const data = response.data
      setwatchlist(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId])

  const deleteWatchlist = (index) => {
    const movieToDelete = watchlist[index]
    console.log(movieToDelete.id)
    axios.delete(`http://localhost:3000/watchlist/${userId}/${movieToDelete.id}`)
    .then((response) => {
      console.log(response)
      const updatedwatchlist = watchlist.filter((movie, i) => i !== index);
      setwatchlist(updatedwatchlist);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageClick = (title) => {
    console.log(title)
    nav(`/movie/${title}`)
  }

  return (
    <div>
      <div className='watched-page'>
        <h1 className='watched-title'>My Watchlist</h1>
        <div className="watched-container">
          {watchlist.map((movie, index) => 
            <div className='watched-movies' key={index}>
              <p onClick={() => deleteWatchlist(index)} className="watched-cross">x</p>
              <img onClick={() => imageClick(movie.title)} className='single-poster' src={movie.poster} alt='poster'/>
              <h3 className="single-title">{movie.title}</h3>
              <div className="single-small">
                <div className="single-left">
                  <p className="single-runtime">'{movie.runtime}</p>
                </div>
                <div className="single-right">
                  <p className="single-type">{movie.type[0].toUpperCase() + movie.type.slice(1, movie.type.length)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}