import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Config from 'helper/config';
import Style from 'style/component/carousel.scss';

export default class Carousel extends React.Component{
	constructor(props){
    super(props);
    
		this.state = {
			// itemList : []
		};
	}

	componentDidMount(){
		// Select first tab
		$(this.refs.tablist).find('.tab-buttons a:first').tab('show');
  }

  componentDidUpdate(prevProps, prevState){
  	// console.log(prevState);
  }

  
	render(){
		//
		return(
	    <div id="myCarousel" className="carousel slide" data-ride="carousel">
	      <ol className="carousel-indicators">
	        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
	        <li data-target="#myCarousel" data-slide-to="1"></li>
	        <li data-target="#myCarousel" data-slide-to="2"></li>
	      </ol>
	      <div className="carousel-inner" role="listbox">
	        <div className="item active">
	          <img className="first-slide" src="res/bg2.jpg" alt="First slide" />
	          <div className="container">
	            <div className="carousel-caption">
	              <h1>Get All Computer Science Books Here.</h1>
	              <p><a className="btn btn-lg btn-success" href={Config.DIR_RULE + '/search/computer'} role="button">Try now</a></p>
	            </div>
	          </div>
	        </div>
	        <div className="item">
	          <img className="second-slide" src="res/bg1.jpg" alt="Second slide" />
	          <div className="container">
	            <div className="carousel-caption">
	            	<h1>Let's go!</h1>
	            </div>
	          </div>
	        </div>
	        <div className="item">
	          <img className="third-slide" src="res/bg3.jpg" alt="Third slide" />
	          <div className="container">
	            <div className="carousel-caption">
	              <h1>Choose your favorite books here.</h1>
	              <h2>Did not find your favorite ones? No worries, we are working hard to put more...</h2>
	              <p><a className="btn btn-lg btn-success" href={Config.DIR_RULE + '/search/computer'} role="button">Browse books</a></p>
	            </div>
	          </div>
	        </div>
	      </div>
	      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
	        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	        <span className="sr-only">Previous</span>
	      </a>
	      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
	        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	        <span className="sr-only">Next</span>
	      </a>
	    </div>

		);
	}

}
