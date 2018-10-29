import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import logo from '../css/logo.svg';
import '../css/App.css';

import PostsList from './postslist';
import PostCreate from './postcreate';
import PostOne from './postone';  

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={PostsList} />
          <Route exact path='/postcreate' component={PostCreate} />
          <Route path='/posts/:id' component={PostOne} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
