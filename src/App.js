import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import Movielist from './components/Movielist';
import Heading from './components/Heading';
import SearchBox from './components/SearchBox';
import NotFound from './components/NotFound';
import AddFavourites from './components/AddFav';
import RemoveFavourites from './components/RemoveFav';
import axios from 'axios';



function App() {
    const [movie, setMovie]=useState([]);
    const [search, setSearch]=useState("");
    const [favourites, setFavourites]=useState([]);

    useEffect(()=>{
        // console.log("useEffect");
        const getMovies= async()=>{
            // setSearch("Aven");
            const url=`http://www.omdbapi.com/?s=${search}&apikey=7bd243cc`;
            const response=await fetch(url);
            const responseJson = await response.json();
            // console.log(responseJson);
            const res=responseJson.Search;
            if(res){
                console.log("True");
                const result=res.filter((x) => x.Poster !== "N/A");
                console.log(result);
                if(result)
                    setMovie(result);
            }
        };
        getMovies();
    },[search]);

    useEffect(()=>{
        // console.log("useEffect");
        const getFavouriteMovies= async()=>{
            try {
                const {data}=await axios.get("http://localhost:3000/favourite");
                console.log(data.data);
                setFavourites(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFavouriteMovies();
    },[favourites]);

    const addToFavourites = async (movie) =>{
        // const newFavMovies=[...favourites,movie];
        try {
            const {data}=await axios.post('http://localhost:3000/insert',{Title:movie.Title, Year:movie.Year, 
                imdbID:movie.imdbID, Type:movie.Type, Poster:movie.Poster});
            setFavourites(null);
        } catch (error) {
            console.log(error);
        }
        // console.log(data.Status);
    }
    const removeFromFavourites = async (movie) =>{
        // const newFavMovies=favourites.filter((fav)=>{return fav.imdbID!==movie.imdbID});
        try {
            const {data}=await axios.post('http://localhost:3000/delete',{imdbID:movie.imdbID});
            setFavourites(null);
        } catch (error) {
            console.log(error);
        }
        // console.log(data.Status);
    }

    return (
        <div className="container-fluid App">
            <div className='row pt-3'>
                <Heading heading="Movies"/>
                <SearchBox search={search} setSearch={setSearch} />
            </div>
            <div className="row movieList">
            {
                (movie.length>0 && search.length>=3) ? 
                <Movielist 
                    component={AddFavourites}
                    FavouritesClick={addToFavourites} 
                    movies={movie} 
                /> : 
                <NotFound />
            }
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4 ">
                <Heading heading="Favourites"/>
            </div>
            <div className="row">
                <Movielist
                    component={RemoveFavourites}
                    FavouritesClick={removeFromFavourites} 
                    movies={favourites}
                />
            </div>
        </div>
    );
}

export default App;
