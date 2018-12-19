import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'
import Card from './cards'
import { fetchAllPosts } from '../actions/posts'
import '../css/App.css'

class PostsList extends Component {

  componentWillMount() {
    const { dispatch } = this.props
    fetchAllPosts(dispatch)
  }

  render() {
    const { postList } = this.props
    console.log(postList);

    return (
      <div className="app">
        <Header linkAdd />
        <div className='container post-list'>
          <div className='row'>
            {postList.map((post) => {
              return(
                <Card key={post.id} post={post} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { postList: state.posts.list }
}

export default connect(mapStateToProps)(PostsList)