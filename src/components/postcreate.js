import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../actions/posts'
import { withRouter } from 'react-router-dom'
import '../css/App.css'
import Header from './header'


class PostCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {tags: [], picture: null}
    this.onAddTagClick = this.onAddTagClick.bind(this)
    this.onTagDeleteClick = this.onTagDeleteClick.bind(this)
    this.onPictureChange = this.onPictureChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onAddTagClick (ev) {
    ev.preventDefault()
    const tag = this.tagInput.value
    if (tag) {
      const previous = this.state.tags.filter(old_tag => {
        if (tag !== old_tag) { return true }
        return false
      })
      this.setState({tags: [...previous, tag]})
      this.tagInput.value = ''
    }
  }

  onTagDeleteClick (tag) {
    return ev => {
      ev.preventDefault()
      const new_tags = this.state.tags.filter(old_tag => {
        if (old_tag !== tag) { return true }
        return false
      })
      this.setState({tags: new_tags})
    }
  }

  onPictureChange (ev) {
    this.setState({
      picture: {
        url: URL.createObjectURL(ev.target.files[0]),
        file: ev.target.files[0]
      }
    })
  }

  onSubmit () {
    const title = this.titleInput.value
    const description = this.descriptionInput.value

    const { tags, picture } = this.state

    if (!title || !description || !tags || !picture) {
      return window.alert('Data Missing!')
    }

    const { dispatch } = this.props

    createPost({title, description, tags}, picture.file, dispatch)

    this.titleInput.value = ''
    this.descriptionInput.value = ''
    this.setState({ tags: [], picture: null })
  }

  componentDidUpdate(prevProps) {
    const prevCur = prevProps.curPost
    const nextCur = this.props.curPost

    if (nextCur && (!prevCur && nextCur || prevCur.id != nextCur.id)) {
      this.props.history.push('/posts/' + nextCur.id)
    }
  }

  render() {
    const { tags, picture } = this.state
    console.log(tags);

    return (
      <div className='app'>
        <Header linkPosts />
        <form className='container'>
          <div className='row'>
            <div className='col-12 col-md-6'>

              <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input
                  ref={c => this.titleInput = c}
                  type="text"
                  className="form-control"
                  id="titleInput"
                  placeholder="Your Post Title"
                />
              </div>

              <div className="form-group al">
                <label htmlFor="descriptionInput">Description</label>
                <textarea
                  ref={c => this.descriptionInput = c}
                  className="form-control"
                  id="descriptionInput"
                  rows="5"
                  placeholder="Your Post Description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tagInput">Tags</label>
                <div className='container'>
                  <div className='row'>
                    <input
                      ref={c => this.tagInput = c}
                      type="text"
                      className="form-control col-12 col-md-9"
                      id="tagInput"
                      placeholder="Your Tag"
                    />
                    <button
                      className="col-12 col-md-3 btn btn-primary"
                      type="button"
                      onClick={this.onAddTagClick}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className='container-fluid'>
                {tags.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="badge badge-secondary"
                      style={{
                        marginRight: '5px',
                        padding: '8px',
                        marginBottom: '5px'
                      }}
                    >
                      {tag}
                      <button
                        className='btn btn-outline-light btn-sm'
                        style={{
                          padding: '4px',
                          marginLeft: '8px',
                          lineHeight: '0.9'
                        }}
                        type='button'
                        onClick={this.onTagDeleteClick(tag)}
                      >
                        x
                      </button>
                    </span>
                  )
                })}
              </div>

            </div>

            <div className='col-12 col-md-6'>
              <div className="form-group">
                <label htmlFor="picture">Picture</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="picture"
                  onChange={this.onPictureChange}
                />
                {picture
                  ? <div
                    style={{
                      width: '100%',
                      height: '500px',
                      backgroundImage: 'url("' + picture.url + '")',
                      backgroundSize: 'contain',
                      backgroundPosition: 'top center',
                      backgroundRepeat: 'no-repeat',
                      marginTop: '10px'
                    }}
                  />
                  : null
                }
              </div>
            </div>

            <div className='col-12 col-md-6'>
              <button
                className="col-12 btn btn-primary"
                type="button"
                onClick={this.onSubmit}
                style={{marginTop: '10px', marginBottom: '20px'}}
              >
                Create Post
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { curPost: state.posts.current }
}

export default withRouter(connect(mapStateToProps)(PostCreate))