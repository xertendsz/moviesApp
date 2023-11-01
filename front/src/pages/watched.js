import React, { useEffect , useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function Watched() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [watched, setWatched] = useState([])
  const [error, setError] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/watched/${userId}`)
    .then(response => {
      const data = response.data
      setWatched(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      setError(error)
      setLoading(false)
  })}, [userId])

  const deleteWatched = (index) => {
    const movieToDelete = watched[index]
    console.log(movieToDelete.id)
    axios.delete(`http://localhost:3000/watched/${userId}/${movieToDelete.id}`)
    .then((response) => {
      console.log(response)
      const updatedWatched = watched.filter((movie, i) => i !== index);
      setWatched(updatedWatched);
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
    <div className='watched-page'>
      <h1 className='watched-title'>Watched</h1>
      <div className="watched-container">
        {watched.map((movie, index) => 
          <div className='watched-movies' key={index}>
            <p onClick={() => deleteWatched(index)} className="watched-cross">x</p>
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
  )
}