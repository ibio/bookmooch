import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Header from 'view/component/header';
import Footer from 'view/component/footer';
import StickySide from 'view/component/stickyside';
import Carousel from 'view/component/carousel';
import BookModel from 'model/book';
import Style from 'style/home.scss';

export default class Home extends React.Component{
	constructor(props){
    super(props);
    this._bookModel = new BookModel();
    this._bookModel.subscribe(function(){
    	var featuredBookList, random;
    	random = Util.getRandomInt(0, this._bookModel.latestBookList.length - 4);
    	// fake a featured list
    	featuredBookList = [
    		this._bookModel.latestBookList[random],
    		this._bookModel.latestBookList[random + 1],
    		this._bookModel.latestBookList[random + 2],
    		this._bookModel.latestBookList[random + 3],
    	];
    	this.setState({
    		latestBookList:this._bookModel.latestBookList, 
    		featuredBookList:featuredBookList, 
    	});
    }, this);
		//instead of return in getInitialState 
		this.state = {
			latestBookList : [],
			featuredBookList : [],
		};
	}

	componentDidMount(){
		this._bookModel.getLatestBookList(64, 0);
		//
		this.refs.stickySide.setTopPoint(400, 350);
		this.refs.stickySide.setBottom(this.refs.footer);
		//
		$(window).scrollTop(0);
  }

  _assembleBookLink(str){
  	return [Config.DIR_RULE, Config.NAV_BOOK, str].join('/');
  }

  // http://daverupert.com/2015/12/intrinsic-placeholders-with-picture/
	render(){
		const latestBookListView = this.state.latestBookList.map(function(item){
			return(
				<div key={Util.uuid()} className="col-lg-3 post-item">
					<div className="entry-image">
						<a href={this._assembleBookLink(item.id)}><img className="img-responsive" src={item.cover} alt={item.title} /></a>
					</div>
					<div className="entry-detail">
						<div className="entry-title">
							<h4 className="ellipsis"><a href={this._assembleBookLink(item.id)}>{item.title}</a></h4>
							<h5 className="ellipsis">{item.author}</h5>
						</div>
						<p className="ellipsis entry-desc">{item.description}</p>
						<h4>Buy Now ${item.price}</h4>
					</div>
				</div>
			);
		}, this);
		// console.log(this.props);
		var featuredPost0 = {}, featuredPost1 = {}, featuredPost2 = {}, featuredPost3 = {};
		if(this.state.featuredBookList){
			featuredPost0 = this.state.featuredBookList[0] || {};
			featuredPost1 = this.state.featuredBookList[1] || {};
			featuredPost2 = this.state.featuredBookList[2] || {};
			featuredPost3 = this.state.featuredBookList[3] || {};
		}
		return(
			<div>
				<header><Header {...this.props} /></header>
				<Carousel />
				<main className="container home">
					<div className="row">
						<div className="col-lg-9">
							<div className="category-title">
								<h3>Featured Books</h3>
							</div>
							<div className="row category-posts">
								<div className="col-lg-6">
									<div className="clearfix">
										<div className="entry-image">
											<a href={this._assembleBookLink(featuredPost0.id)}>
												<picture className="intrinsic intrinsic--9x16">
										      <source media="(min-width: 500px)" srcSet={featuredPost0.cover} />
										      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
										    </picture>
											</a>
										</div>
										<div className="entry-detail">
											<div className="entry-title">
												<h4 className="ellipsis"><a href={this._assembleBookLink(featuredPost0.id)} dangerouslySetInnerHTML={{__html:featuredPost0.title}}></a></h4>
												<h4>{featuredPost0.author}</h4>
												<h5>{featuredPost0.description}</h5>
												<h5>{featuredPost0.edition}</h5>
												<h3>${featuredPost0.price}</h3>
											</div>
										</div>
									</div>
									<hr />
									<div className="clearfix">
										<div className="entry-image screen-mobile-image">
											<a href={this._assembleBookLink(featuredPost1.id)}>
												<picture className="intrinsic intrinsic--9x16">
										      <source media="(min-width: 500px)" srcSet={featuredPost1.cover} />
										      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
										    </picture>
											</a>
										</div>
										<div className="entry-detail">
											<div className="entry-title">
												<h4 className="ellipsis"><a href={this._assembleBookLink(featuredPost1.id)} dangerouslySetInnerHTML={{__html:featuredPost1.title}}></a></h4>
												<h4>{featuredPost1.author}</h4>
												<h5>{featuredPost1.description}</h5>
												<h5>{featuredPost1.edition}</h5>
												<h3>${featuredPost1.price}</h3>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-6">
									<div className="clearfix">
										<div className="entry-image">
											<a href={this._assembleBookLink(featuredPost2.id)}>
												<picture className="intrinsic intrinsic--9x16">
										      <source media="(min-width: 500px)" srcSet={featuredPost2.cover} />
										      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
										    </picture>
											</a>
										</div>
										<div className="entry-detail">
											<div className="entry-title">
												<h4 className="ellipsis"><a href={this._assembleBookLink(featuredPost2.id)} dangerouslySetInnerHTML={{__html:featuredPost2.title}}></a></h4>
												<h4>{featuredPost2.author}</h4>
												<h5>{featuredPost2.description}</h5>
												<h5>{featuredPost2.edition}</h5>
												<h3>${featuredPost2.price}</h3>
											</div>
										</div>
									</div>
									<hr />
									<div className="clearfix">
										<div className="entry-image">
											<a href={this._assembleBookLink(featuredPost3.id)}>
												<picture className="intrinsic intrinsic--9x16">
										      <source media="(min-width: 500px)" srcSet={featuredPost3.cover} />
										      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
										    </picture>
											</a>
										</div>
										<div className="entry-detail">
											<div className="entry-title">
												<h4 className="ellipsis"><a href={this._assembleBookLink(featuredPost3.id)} dangerouslySetInnerHTML={{__html:featuredPost3.title}}></a></h4>
												<h4>{featuredPost3.author}</h4>
												<h5>{featuredPost3.description}</h5>
												<h5>{featuredPost3.edition}</h5>
												<h3>${featuredPost3.price}</h3>
											</div>
										</div>
									</div>
									
								</div>
							</div>

							<div className="category-title">
								<h3>Latest Books</h3>
							</div>
							<div className="row latest-posts">
								{latestBookListView}
							</div>

						</div>
						<div className="col-lg-3">
							<StickySide ref="stickySide" />
						</div>
					</div>
				</main>
				<footer ref="footer"><Footer {...this.props} /></footer>
			</div>
		);
	}

}
