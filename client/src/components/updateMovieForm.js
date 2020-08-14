import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import MovieList from '../Movies/MovieList'

const initialState = {
    title: '',
    director:'',
    metascore:'',
    stars:[]
}

function MovieForm(props) {
    const [movie, setMovie] = useState(initialState)
    const { id } = useParams()
    const push = useHistory()


useEffect(() => {
    
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then( res => {
        console.log({res})
        setMovie(res.data)
    })
    .catch(err => console.log(err))
},[id])

const changeHandler = (e) => {
    e.persist()
    let name = e.target.name
    let value =  e.target.value 

    if (name === 'stars') {
        value = value.split(',')
    }
    setMovie({
        ...movie, [name]:value
    })
}

const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => {
        console.log(res.data)
        props.setMovieList([...props.movieList,res.data])
        push('/')
    })
    .catch(err => console.log(err))
}
    return (
        <form>
<label> Director:
    <input 
    value={movie.director}
    onChange={changeHandler}
    name='director'
    type='text'
    />

</label>

<label> Title:
<input 
    value={movie.title}
    onChange={changeHandler}
    name='title'
    type='text'
    /> 
</label>

<label> Stars:
    <input 
    value={movie.stars}
    onChange={changeHandler}
    name='stars'
    type='text'   

    />
</label>

<label> Metascore:
    <input 
    value={movie.metascore}
    onChange={changeHandler}
    name='metascore'
    type='number'
    />

    <button onClick={handleSubmit}> Submit </button>
</label>
 
    


        </form>
    )
}


export default MovieForm