import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import OwlCarousel from 'lib/owlcarousel/owl.carousel';
import Util from 'helper/util';
import Config from 'helper/config';
import Header from 'view/component/header';
import Footer from 'view/component/footer';
import Popup from 'view/component/popup';
import BookModel from 'model/book';
import Checkout from 'view/component/checkout';
import Style from 'style/book.scss';

const URL_SHARE_FACEBOOK = 'https://www.facebook.com/sharer/sharer.php?u=';
const URL_SHARE_TWITTER = 'https://twitter.com/home?status=';
const URL_SHARE_LINKEDIN = 'https://www.linkedin.com/shareArticle?url=';
const URL_SHARE_GOOGLEPLUS = 'https://plus.google.com/share?url=';

export default class Book extends React.Component{
	constructor(props){
    super(props);
    this._bookModel = new BookModel();
    //
    this._bookModel.subscribe(function(){
    	this.setState({bookDetail:this._bookModel.bookDetail});
    }, this);
		//instead of return in getInitialState 
		this.state = {
			bookDetail : {},
		};
	}

	componentDidMount(){
		this.refs.checkout.setBottom(this.refs.footer);
		this._getCurrentContent();
  }

  componentDidUpdate(prevProps, prevState){
  	if(this.props.navs !== prevProps.navs){
			this._getCurrentContent();
  	}
  }

  _getCurrentContent(){
  	const id = this.props.navs[1];
		if(id){
			this._bookModel.getBookDetail(id, false, function(){
				this._updatePageMeta();
    	}, this);
		}
		$(window).scrollTop(0);
  }

  _updatePageMeta(){
  	// console.log(this.state.post);
  	$('title').html(this.state.bookDetail.title + ' - BookMooch');
  }

  _assembleBookLink(str){
  	return [Config.DIR_RULE, Config.NAV_Book, str].join('/');
  }

  _handleAddClick(book){
  	this.refs.checkout.updateCart(-1, book);
  }

	render(){
		var tagListView = [];
		var featuredPostTop = {}, featuredPost0 = {}, featuredPost1 = {}, featuredPost2 = {}, featuredPost3 = {};
		//
		if(this.state.bookDetail.subjects){
			tagListView = this.state.bookDetail.subjects.map(function(item){
				return(<a key={Util.uuid()} href="#">{item}</a>);
			});
		}

		if(this.state.authorPostList){
			featuredPost0 = this.state.authorPostList[0] || {};
			featuredPost1 = this.state.authorPostList[1] || {};
			featuredPost2 = this.state.authorPostList[2] || {};
			featuredPost3 = this.state.authorPostList[3] || {};
		}

		return(
			<div>
				<Popup ref="popup" />
				<header><Header {...this.props} /></header>
				<main className="container book">
					<div className="row">
						<div className="col-lg-9">
							<h2 dangerouslySetInnerHTML={{__html:this.state.bookDetail.title}} className="title"></h2>
							<div className="entry-content">
								<div className="row">
									<div className="col-sm-4">
										<picture className="intrinsic intrinsic--9x16">
								      <source media="(min-width: 500px)" srcSet={this.state.bookDetail.cover} />
								      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item" />
								    </picture>
									</div>
									<div className="col-sm-8">
										<h4>Author: <em>{this.state.bookDetail.author}</em></h4>
										<h4>Tags:</h4>
										<div className="clearfix tagcloud">
											{tagListView}
										</div>
										<hr />
										<p>Description: {this.state.bookDetail.description}</p>
										<p>Edition: {this.state.bookDetail.edition}</p>
										<p>ISBN: {this.state.bookDetail.isbn}</p>
										<p>OCLC: {this.state.bookDetail.oclc}</p>
										<p>Publisher: {this.state.bookDetail.publisher}</p>
										<p><a href={this.state.bookDetail.url} target="_blank">More Detail</a></p>
										<div dangerouslySetInnerHTML={{__html:this.state.bookDetail.summary}}></div>
										<h3>${this.state.bookDetail.price} <button className="btn btn-warning" onClick={this._handleAddClick.bind(this, this.state.bookDetail)} ><i className="glyphicon glyphicon-shopping-cart"></i> Add to Cart</button></h3>
									</div>
								</div>

								<div className="clearfix si-share social-share">
									<span>Share this Book:</span>
									<div>
										<a href={URL_SHARE_FACEBOOK + document.location.href} className="social-icon si-borderless si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a href={URL_SHARE_TWITTER + encodeURIComponent(document.location.href)} className="social-icon si-borderless si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
										<a href={URL_SHARE_LINKEDIN + encodeURIComponent(document.location.href)} className="social-icon si-borderless si-linkedin">
											<i className="icon-linkedin"></i>
											<i className="icon-linkedin"></i>
										</a>
										<a href={URL_SHARE_GOOGLEPLUS + document.location.href} className="social-icon si-borderless si-gplus">
											<i className="icon-gplus"></i>
											<i className="icon-gplus"></i>
										</a>
									</div>
								</div>

							</div>

							<h4 className="related-title">Related Books:</h4>
							<div className="row related-posts">
								<div className="col-lg-3">
									<div className="entry-image">
										<a href={this._assembleBookLink(featuredPost0.slug)}>
											<picture className="intrinsic intrinsic--9x16">
									      <source media="(min-width: 500px)" srcSet="res/coming-soon.jpg" />
									      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
									    </picture>
										</a>
									</div>
									<div className="entry-detail">
										Coming Soon...
									</div>
								</div>
								
								<div className="col-lg-3">
									<div className="entry-image">
										<a href={this._assembleBookLink(featuredPost2.slug)}>
											<picture className="intrinsic intrinsic--9x16">
									      <source media="(min-width: 500px)" srcSet="res/coming-soon.jpg" />
									      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
									    </picture>
										</a>
									</div>
									<div className="entry-detail">
										Coming Soon...
									</div>
								</div>

								<div className="col-lg-3">
									<div className="entry-image">
										<a href={this._assembleBookLink(featuredPost2.slug)}>
											<picture className="intrinsic intrinsic--9x16">
									      <source media="(min-width: 500px)" srcSet="res/coming-soon.jpg" />
									      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
									    </picture>
										</a>
									</div>
									<div className="entry-detail">
										Coming Soon...
									</div>
								</div>

								<div className="col-lg-3">
									<div className="entry-image">
										<a href={this._assembleBookLink(featuredPost2.slug)}>
											<picture className="intrinsic intrinsic--9x16">
									      <source media="(min-width: 500px)" srcSet="res/coming-soon.jpg" />
									      <img alt="Featured Post" srcSet={Config.STATIC_ROOT + '/res/placeholder.png'} className="intrinsic-item img-rounded" />
									    </picture>
										</a>
									</div>
									<div className="entry-detail">
										Coming Soon...
									</div>
								</div>

							</div>
							<hr />
						</div>
						<div className="col-lg-3">
							<Checkout ref="checkout" />
						</div>
					</div>
				</main>
				<footer ref="footer"><Footer {...this.props} /></footer>
			</div>
		);
	}

}
