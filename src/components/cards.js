import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/cards.css'

const Card = ({ post }) => {
  return (
    <div className='col-12 col-md-6 col-lg-4'>
      <div className="card" style={{marginBottom: '20px'}}>
        <div className='post-img-parent'>
          <div
            className='post-img-child'
            style={{
              backgroundImage: 'url("http://localhost:3000/' + post.photoUrl + '")'
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
					<ul class="list-group list-group-flush row">
    				<li class="list-group-item">
							<div className="tag-card">
								{post.tags.map((tag, idx) => {
									return (
										<Link
											to={'/posts/' + post.id}
											key={idx}
											className="badge badge-secondary badge-tags"
										>
											{tag}
										</Link>
									)
								})}
								<Link className="btn btn-primary" to={'/posts/' + post.id}>
									View Post
								</Link>
							</div>
						</li>
					</ul>
        </div>
      </div>
    </div>
  )
}

export default Card