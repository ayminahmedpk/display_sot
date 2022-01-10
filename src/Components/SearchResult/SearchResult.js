// Dependencies
// React
import React from 'react';
// Router
import { Link } from 'react-router-dom';
// HTML Entities
import he from 'he';

// Style
import './SearchResult.scss';


const SearchResult = (props) => {
    
    const videoTitle = he.decode(props.videoTitle);
    
    return (
        <div className="search-result">
            <Link
                to        = {`/${props.videoID}`}
                className = {`search-result__title`}
            >
                {videoTitle}
            </Link>
        </div>
    );
    
};



export default SearchResult;