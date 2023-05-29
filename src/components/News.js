import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'sports',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      loading: false,
      page: 1
    }
    document.title = `NewsHub - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async getNews(page) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    await this.getNews(this.state.page);
  }

  handlePrev = async () => {
    const { page } = this.state;
    await this.getNews(page - 1);
    this.setState({ page: page - 1 });
  }

  handleNext = async () => {
    const { page } = this.state;
    await this.getNews(page + 1);
    this.setState({ page: page + 1 });
  }

  fetchMore = async () => {
    const nextPage = this.state.page + 1
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let response = await fetch(url);
    let data = await response.json();
    this.setState((prevState) => ({
      articles: prevState.articles.concat(data.articles),
      totalResults: data.totalResults,
      page: nextPage,
      loading: false
    }))
  }

  render() {
    return (
      <>
        <h1 className='text-center'>{this.props.category === 'general' ? `News Hub - Top Headlines` : `News Hub - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}>
          <div className="container my-3 ">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-2" key={element.url} >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 55) : "Default title"}
                    description={element.description ? element.description.slice(0, 85) : "This is default description"}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AmaZLePcSE92A3ckosc6rcREKbJqHubKPg&usqp=CAU"}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    publishedAt={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page === 1} onClick={this.handlePrev} className="btn btn-primary">&lArr; Previous</button>
        <button type="button" disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} className="btn btn-primary">Next &rArr;</button>
      </div> */}
      </>
    )
  }
}

export default News
