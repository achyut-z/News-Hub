import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, publishedAt } = props;

    let defaultDesc = !description || description === "This is default description"

    return (
      <div>
        <div className="card">
          <img src={imageUrl} style={{height: '235px'}} className="card-img-top" alt="..." />
            <div className="card-body" style={{height: defaultDesc?'250px':'250px'}}>
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary" style={{marginTop: defaultDesc?'25px':'auto'}}>Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
