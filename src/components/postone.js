import React, {Component} from 'react'
import '../css/App.css'
import Header from './header'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchOnePost } from '../actions/posts'

class PostOne extends Component {
  componentWillMount() {
    const { match, post, dispatch } = this.props
    if (!post || post.id !== match.params.id) {
      fetchOnePost(match.params.id, dispatch)
    }
  }

  render() {
    const { post } = this.props



    return (
      post
        ? <div className='app'>
          <Header linkAdd linkPosts />
          <div
              style={{
                width: '100%',
                paddingTop: '40%',
                backgroundImage: 'url("http://localhost:3000/' + post.photoUrl + '")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginTop: '-20px',
                marginBottom: '20px'
              }}
            />
          <div className='container'>
            <h1><strong>{post.title}</strong></h1>
            <p>{post.description}</p>

            {post.tags.map((tag, idx) => {
                return (
                  <span
                    key={idx}
                    className="badge badge-secondary"
                    style={{
                      marginRight: '5px',
                      padding: '8px',
                      marginBottom: '5px'
                    }}
                  >
                    {tag}
                  </span>
                )
              })
            }
          </div>
        </div>
      : null
    )
  }
}

const mapStateToProps = (state) => {
  return { post: state.posts.current }
}

export default withRouter(connect(mapStateToProps)(PostOne))