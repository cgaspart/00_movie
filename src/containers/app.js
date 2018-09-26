import React, {Component} from 'react'
import axios from 'axios'
import SearchBar from '../components/search-bar'
import VideoDetail from '../components/video-detail'
import Video from "../components/video"
import VideoList from './video-list'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"
const API_KEY = "api_key=YOUR_API_KEY"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {movieList:{}, currentMovie:{}}
        this.init_movies();
    }

    init_movies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(result){
            this.setState({movieList:result.data.results.slice(1,6), currentMovie:result.data.results[0]}, function() {
                this.add_video_to_current_movie();
            });
        }.bind(this));
    }

    add_video_to_current_movie() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(result){
            const youtubeKey = result.data.videos.results[0].key;
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoID = youtubeKey;
            this.setState({currentMovie : newCurrentMovieState})
        }.bind(this));
    }

    onClickListItem(movie){
        this.setState({currentMovie:movie},function(){
            this.add_video_to_current_movie();
            this.setRelatedMovie();
        })
    }

    onClickSearch(searchText) {
        if (searchText)
        {
            axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(result){
                if (result.data.results.length > 0 && result.data.results[0].id != this.state.currentMovie.id)
                    this.setState({currentMovie:result.data.results[0]},() => {
                        this.add_video_to_current_movie();
                        this.setRelatedMovie();
                })
            }.bind(this))
        }
    }

    setRelatedMovie() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(result){
            this.setState({movieList:result.data.results.slice(0,5)});
        }.bind(this));
    }

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length == 5)
                return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
        }
        return (
            <div>
                <div className="search_bar">
                    <SearchBar callback={this.onClickSearch.bind(this)}/>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoID}/>
                        <VideoDetail title={this.state.currentMovie.title} detail={this.state.currentMovie.overview}/>
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;