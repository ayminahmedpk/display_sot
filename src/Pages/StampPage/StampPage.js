// Dependencies
// React
import React from 'react';
// Router
import { useParams } from 'react-router';
// Redux
import {Provider} from 'react-redux'                  ;
import store      from '../../Redux/playerReducer.js' ;

// Components
import YouTubeVideo from '../../Components/YouTubeVideo/YouTubeVideo.js'  ;
import Controls     from '../../Components/Controls/ControlsContainer.js' ;

// Helper Functions




const StampPage = (props) => {
    
    const {videoID} = useParams();

    return (
        <>
        <Provider store={store}>
            < YouTubeVideo videoID={videoID}/>
            < Controls     />
        </Provider>
        </>
    );
};




export default StampPage;