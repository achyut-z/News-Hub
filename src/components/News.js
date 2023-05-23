import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount() {
    console.log("cdm")
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=81aeadde72fa409b87c747ec50640dbb"
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles:parsedData.articles})
  }

  render() {
    console.log("render")
    return (
      <div className="container my-3">
        <h1> News Hub - Top headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-3 my-2" key={element.url} >
              <NewsItem title={element.title?element.title.slice(0, 55):"Default title"} description={element.description?element.description.slice(0, 85):"This is default description"} imageUrl={element.urlToImage?element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEAhgAtuqULBo0DLtL8ifUca9jdFsRh2Y8A&usqp=CAU"} newsUrl={element.url} />
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default News
