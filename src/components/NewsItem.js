import React, { Component } from 'react'

export default class NewsItem extends Component {
  
  
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div className="my-3">
        <div className="card">
        <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{left: '50%', zIndex: '1'}}>{source}</span>
          <img src={!imageUrl?"https://www.vskills.in/certification/blog/wp-content/uploads/2015/01/structure-of-a-news-report.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className='card-title'>{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className='text-danger'>By {!author?'unknown':author} on {date}</small></p>
            <a href={newsUrl} className='btn btn-sm btn-dark'>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
