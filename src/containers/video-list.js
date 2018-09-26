import React from 'react'
import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
    const movieList = props.movieList;
    return (
        <div>
            <ul>
                {
                    movieList.map(i_movie => {
                        return <VideoListItem key={i_movie.id} movie={i_movie} callback={recieveCallBack}/>
                    })
                }
            </ul>
        </div>
    );
    function recieveCallBack(movie){
        props.callback(movie);
    }
}

export default VideoList;