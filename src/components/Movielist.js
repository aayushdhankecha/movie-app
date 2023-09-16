import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import './MovieCSS.css';
import '../components/AddFav';

const Movielist=(props)=>{
    const Component=props?.component;
    return (
        <>
            {props.movies?.map((movie)=>(
                <div className="d-flex justify-content-start m-3 col image-container">
                    <img src={movie.Poster} height = "250px" width="170px" alt="poster" />
                    <div onClick={()=>props.FavouritesClick(movie)} className='overlay d-flex align-item-center justify-content-center'>
                        <Component/>
                    </div>
                </div>
            ))}
        </>
    )
}
export default Movielist;