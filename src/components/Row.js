import React, { useEffect, useState, useRef } from "react";
import axios from '../axios';
import '../row.css'

function Row(props) {
    let { title, fetchUrl, isLargeRow } = props;
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const rowRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        isDragging.current = true;
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const scrollX = startX.current - e.clientX;
        startX.current = e.clientX;
        rowRef.current.scrollLeft += scrollX;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])
    return (
        <>
            <div className="row">
                <h2>{title}</h2>
                <div className="row_posters"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp} ref={rowRef}>
                    {movies.map((movie)=>(
                        <img key={movie.id} className={`${isLargeRow?"row_posterLarge": "row_poster"}`} src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} loading="lazy" />
                    ))}
                </div>
            </div>
        </>
    )
}
export default Row;