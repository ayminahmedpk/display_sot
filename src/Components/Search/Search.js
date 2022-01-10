// Dependencies
// React
import {useState, React} from "react";

// Components
import SearchResult from "../SearchResult/SearchResult";

// Helper Functions
import encodeParams   from "../../helperFunctions/encodeParams";
import encodedParamsToString from "../../helperFunctions/encodedParamsToString";

// Style
import './Search.scss';


const Search = () => {

    const [searchString, setSearchString ]  = useState('');
    const [searchResults, setSearchResults] = useState([]);

       
    const retrieveSearchResults = async () => {
        const endpoint    = 'https://www.googleapis.com/youtube/v3/search';
        const queryParams = {
            key         : 'AIzaSyANKVJ7LcR4YAZli4v2jYH9aghAAXk08ac',
            q           : searchString, // Search Query, linked to state
            otherParams : {
                part       : 'snippet',
                type       : 'video'  ,
                maxResults : '15'     ,
            },
        };
        const encodedParams = encodeParams(queryParams);
        const queryString   = encodedParamsToString(encodedParams);
        const requestURL    = endpoint + queryString;
        const response      = await fetch(requestURL);
        const data          = await response.json();
        return data;
    }

    const renderSearchResults = async () => {
        const data    = await retrieveSearchResults();
        const results = data.items.map((item, index) => (
            <SearchResult
                key        = {index}
                videoTitle = {item.snippet.title}
                videoID    = {item.id.videoId}
            />
        ));
        setSearchResults(results)
    }


    return (
        <>
        <input
            type     = 'text'
            value    = {searchString}
            onChange = {(e) => { setSearchString(e.target.value); }}
        />
        <button onClick = {renderSearchResults}>Search</button>
        <div className={'search-results-container'}>
            {searchResults}
        </div>
        </>
    );

};



export default Search;
