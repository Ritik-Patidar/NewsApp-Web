import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl , author , articleDate} = this.props ;
        return (
            <div>
                <div className="card m-3" style={{width: "18rem",height:"30rem"}}>
                    <div className="card-body p-0">
                        <div style={{height:"24rem",overflow:"hidden"}}>
                            <img src={imageUrl} className="card-img-top" alt="..." />
                            <div className="p-2">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                            </div>
                        </div>
                        <div className="px-2 w-100" style={{position:"absolute",bottom:"15px"}} >
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(articleDate).toGMTString() }</small></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
