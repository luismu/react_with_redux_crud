import superagent from 'superagent'
import constants from '../constants/posts'

const apiUrl = 'http://localhost:3000'

export const fetchAllPosts = (dispatch) => {
  superagent
    .get(`${apiUrl}/posts`)
    .end((err, res) => {
      if (err) { return console.log('Error getting posts') }
      dispatch({ type: constants.FETCH_ALL_POSTS, posts: res.body })
    })
}

export const createPost = (jsonData, picture, dispatch) => {
  superagent
    .post(`${apiUrl}/posts`)
    .send(jsonData)
    .end((err, res) => {
      if (err) { return console.log('error creating post') }
      const id = res.body.id
      let formData = new FormData()
      formData.append('image', picture)
      superagent
        .put(`${apiUrl}/posts/` + id + '/picture')
        .send(formData)
        .end((err, res) => {
          if (err) { return console.log('Error Updating Picture') }
          dispatch({ type: constants.CREATE_POST, post: res.body })
        })
    })
}

export const fetchOnePost = (id, dispatch) => {
  superagent
    .get(`${apiUrl}/posts/` + id)
    .end((err, res) => {
      if (err) { return console.log('Error Fetching Post') }
      dispatch({ type: constants.FETCH_ONE_POST, post: res.body })
    })
}