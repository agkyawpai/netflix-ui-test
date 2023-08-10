import React, { useState, useEffect } from "react";
import axios from '../axios';
import requests from "../requests";
import '../banner.css';

function Banner(props) {
    let { fetchUrl } = props;
    const [movie, setMovie] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    console.log(base_url)
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
            return request;
        }
        fetchData();
    },[])
    function truncate(str) {
        return str?.length > 200 ? str.substr(0, 150-1) + "..." : str;
    }
    return (
        <>
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url(${base_url}${movie?.backdrop_path})`
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_btns">
                <button className="banner_btn">Play</button>
                <button className="banner_btn">My List</button>
            </div>
            <h1 className="banner_description">
                {truncate(movie?.overview)}
            </h1>
            </div>
            <div className="banner_fadeBottom"></div>
        </header>
        </>
    )
}
export default Banner;