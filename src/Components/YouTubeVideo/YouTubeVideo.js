// Dependencies
// React
import {useRef, useEffect, React} from 'react'                     ;
import {updatePlayerRef}          from '../../Redux/playerReducer' ;
// Redux
import {useDispatch}              from 'react-redux'               ;
// Other
import ReactPlayer                from 'react-player'              ;

//Style
import './YouTubeVideo.scss';



const YouTubeVideo = (props) => {

    const ourRef = useRef(null)
    const dispatch = useDispatch();
    useEffect(
        () => { dispatch(updatePlayerRef(ourRef)) } ,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ourRef]
    );

    const {videoID} = props;
    const url = 'https://www.youtube.com/watch?v=' + videoID;

    return (
        <div className="video__outer-container">
            <div className="video__inner-container">
                <ReactPlayer
                    ref       = {ourRef}
                    url       = {url}
                    className = 'react-player'
                    width     = '100%'
                    height    = '100%'
                    controls  = {true}
                />
            </div>
        </div>
    );

}



export default YouTubeVideo;