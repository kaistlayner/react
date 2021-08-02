//import React from "react"
import PropTypes from "prop-types"

function Cal({inputstr}){
  return(
    inputstr
    /*<div className="movie">
      <img src={poster} alt={title} title={title}></img>
      <div className="movie__data">
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__year">{year}</h5>
        <ul className="genres">{genres.map((genre, index) => 
          <li key={index} className="genres__genre">{genre}</li>
        )}
        </ul>
        <p className="movie__summary">{summary}</p>
      </div>
    </div>*/
  )
}

Cal.propTypes = {
  id: PropTypes.number.isRequired,
  inputstr: PropTypes.string.isRequired,
  /*year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired*/
}

export default Cal;