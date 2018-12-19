import defs from '../defs/posts'

const initialState = {
    list: [],
    current: null
  }
  
  const postReducer = (state = initialState, action) => {
    if (action.type === defs.FETCH_ALL_POSTS) {
      return { list: action.posts, current: state.current }
    }
    if (action.type === defs.CREATE_POST) {
      return { list: [action.post, ...state.list], current: action.post }
    }
    if (action.type === defs.FETCH_ONE_POST) {
      return { list: state.list, current: action.post }
    }
    return state
  }
  
  export default postReducer