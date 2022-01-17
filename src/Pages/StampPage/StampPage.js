// Dependencies
// React
import React from 'react' ;
// Router
import { useParams } from 'react-router' ;
// Redux
import {Provider} from 'react-redux'          ;
import store      from '../../Redux/store.js' ;
// Components
import YouTubeVideo      from '../../Components/YouTubeVideo/YouTubeVideo.js'  ;
import ControlsContainer from '../../Components/Controls/ControlsContainer.js' ;
import StampList         from '../../Components/StampList/StampList.js'        ;
import CommentContainer  from '../../Components/Comment/CommentContainer.js'   ;

// Helper Functions




const StampPage = (props) => {
    
    const {videoID} = useParams();

    return (
        <>
        <Provider store={store}>
            < YouTubeVideo videoID={videoID}/>
            < ControlsContainer />
            <StampList />
            <CommentContainer/>
        </Provider>
        </>
    );
};




export default StampPage;