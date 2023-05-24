import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 12
    }
  }

  async getNews(page) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=81aeadde72fa409b87c747ec50640dbb&page=${page}&pageSize=${this.state.pageSize}`;
    const response = await fetch(url);
    const { articles, totalResults } = await response.json();
    return { articles, totalResults };
  }

  async componentDidMount() {
    const { articles, totalResults } = await this.getNews(this.state.page);
    this.setState({ articles, totalResults });
  }

  handlePrev = async () => {
    const { page } = this.state;
    const { articles, totalResults } = await this.getNews(page - 1);
    this.setState({ articles, totalResults, page: page - 1 });
  }

  handleNext = async () => {
    const { page } = this.state;
    const { articles, totalResults } = await this.getNews(page + 1);
    this.setState({ articles, totalResults, page: page + 1 });
  }


  render() {
    return (
      <div className="container my-3 ">
        <h1> News Hub - Top headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-3 my-2" key={element.url} >
              <NewsItem title={element.title ? element.title.slice(0, 55) : "Default title"} description={element.description ? element.description.slice(0, 85) : "This is default description"} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AmaZLePcSE92A3ckosc6rcREKbJqHubKPg&usqp=CAU"} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page === 1} onClick={this.handlePrev} className="btn btn-primary">&lArr; Previous</button>
          <button type="button" disabled={this.state.page === Math.ceil(this.state.totalResults / this.state.pageSize)} onClick={this.handleNext} className="btn btn-primary">Next &rArr;</button>
        </div>
      </div>
    )
  }
}

export default News
