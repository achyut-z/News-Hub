import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    let { title, description, imageUrl, newsUrl, author, publishedAt } = this.props;

    return (
      <div>
        <div className="card">
          <img src={imageUrl} style={{height: '235px'}} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
