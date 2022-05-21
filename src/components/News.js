import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Pagination from './Pagination';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
  import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super();
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74117d0a5ab7400daf1cbbf589b611fa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    changePage = async (pageNo) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74117d0a5ab7400daf1cbbf589b611fa&page=${pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: pageNo,
            article: parsedData.articles,
            loading: false
        });
    }

    fetchMoreData = async() =>{
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=74117d0a5ab7400daf1cbbf589b611fa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles) ,
        });
    };

    render() {
        return (
            <>
                <div className="container-fluid my-5">
                    { this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.article.length}
                        next={this.fetchMoreData}
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        // inverse={true} //
                        hasMore={this.state.article.length !== this.state.totalResults}
                        loader={<Spinner />}
                        // scrollableTarget="scrollableDiv" 
                        >
                        <div className="d-flex flex-wrap justify-content-center">
                            { this.state.article.map((element) => {
                                return <NewsItem key={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} articleDate={element.publishedAt} />
                            })} 
                        </div>

                    </InfiniteScroll>

                    {/* <div className="d-flex justify-content-center container my-5">
                        <Pagination handleChanges={this.changePage} totalPages={this.state.totalResults} pageSize={this.props.pageSize} />
                    </div> */}

                    {/* <div className="d-flex justify-content-evenly container m-5" >
                    <button type="button" class="btn btn-secondary">&larr; Previous</button>
                    <button type="button" class="btn btn-secondary">Next &rarr;</button>
                </div> */}
                </div>
            </>
        )
    }
}

export default News
