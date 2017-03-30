import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Header from 'view/component/header';
import Footer from 'view/component/footer';
import Stickyside from 'view/component/stickyside';
import BookModel from 'model/book';
import Style from 'style/author.scss';

export default class Author extends React.Component{
	constructor(props){
    super(props);
    this._bookModel = new BookModel();
    this._bookModel.subscribe(function(){
    	this.setState({resultBookList:this._bookModel.authorBookList, totalPages:this._bookModel.authorBookPages});
    }, this);
		//instead of return in getInitialState 
		this.state = {
			resultBookList : [],
			currentPage:1,
			totalPages:0,
		};
	}

	componentDidMount(){
		this.refs.stickySide.setBottom(this.refs.footer);
		$(window).scrollTop(0);
		this._search();
  }

  componentDidUpdate(prevProps, prevState){
  	if(this.props.navs !== prevProps.navs || this.props.nid !== prevProps.nid){
			this._search();
  	}
  }

  _search(){
  	const currentPage = parseInt(this.props.nid, 10) || 1;
  	// console.log(this.props.navs[1]);
  	this.setState({resultBookList:[], currentPage});
  	// keyword
    if(this.props.navs[1]){
    	this._bookModel.searchBookListByAuthor(this.props.navs[1], 100, currentPage);
    }
  }

  _assembleBookLink(str){
  	return [Config.DIR_RULE, Config.NAV_BOOK, str].join('/');
  }

  _handlePageClick(page){
  	const current = this.props.navs[1] || '';
  	var categoryWithPage, index;
  	if(page === 'prev'){
  		index = this.state.currentPage - 1;
  	}else if(page === 'next'){
  		index = this.state.currentPage + 1;
  	}else{
  		index = page;
  	}
  	//
  	categoryWithPage = current + ':' + index;
  	if(index >= 1 && index <= this.state.totalPages){
  		document.location.href = [Config.DIR_RULE, Config.NAV_SEARCH, categoryWithPage].join('/');
  	}
  }

	render(){
		const resultBookListView = this.state.resultBookList.map(function(item){
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

		//
		var paginationView = [], fistPageView = (this.state.currentPage === 1), lastPageView = (this.state.currentPage === this.state.totalPages);
		console.log(this.state.totalPages);
		for(var i = 1; i <= this.state.totalPages; i++){
			paginationView.push(<li key={Util.uuid()} className={Classnames({active:i === this.state.currentPage})}><a href="javascript:void(0);" onClick={this._handlePageClick.bind(this, i)}>{i}</a></li>);
		}
		return(
			<div>
				<header><Header {...this.props} /></header>
				<main className="container author">
					<div className="row">
						<div className="col-lg-9">
							<div className="category-title">
								<h3>{this.props.navs[1]}</h3>
							</div>
							<div className="statistics">
								<h5>
									<span>Total Books: {this._bookModel.authorBooks}</span> 
									<span>Total Pages: {this._bookModel.authorBookPages}</span>
								</h5>
							</div>
							<div className="row latest-posts">
								{resultBookListView}
							</div>

							<nav aria-label="Page navigation" className="page-nav">
							  <ul className="pagination">
							    <li className={Classnames({disabled:fistPageView})}>
							      <a href="javascript:void(0);" onClick={this._handlePageClick.bind(this, 'prev')} aria-label="Previous">
							        <span aria-hidden="true">&laquo;</span>
							      </a>
							    </li>
							    {paginationView}
							    <li className={Classnames({disabled:lastPageView})}>
							      <a href="javascript:void(0);" onClick={this._handlePageClick.bind(this, 'next')} aria-label="Next">
							        <span aria-hidden="true">&raquo;</span>
							      </a>
							    </li>
							  </ul>
							</nav>

						</div>
						<div className="col-lg-3">
							<Stickyside ref="stickySide" />
						</div>
					</div>
				</main>
				<footer ref="footer"><Footer {...this.props} /></footer>
			</div>
		);
	}

}
