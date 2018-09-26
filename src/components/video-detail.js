import React from 'react'

const VideoDetail = ({title,detail}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{detail}</p>
        </div>
    );
}

export default VideoDetail;