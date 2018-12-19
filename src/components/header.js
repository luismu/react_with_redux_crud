import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/App.css';


const Header = ({ linkAdd, linkPosts }) => {
  return(
		<header>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to='/'><i className="fas fa-laptop-code"></i></Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav">
						<Link class="nav-item nav-link active" to='/'>Talos_technical_test<span className="sr-only">(current)</span></Link>
					</div>
				</div>
				<div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							{linkPosts ? <Link className="nav-item nav-link" to='/'>Posts</Link> : null}
						</li>
						<li class="nav-item">
							{linkAdd ? <Link className="nav-item nav-link" to='/create'><i class="fas fa-plus-circle"></i></Link> : null}
						</li>
						</ul>
				</div>
			</nav>
		</header>
    )
}

export default Header