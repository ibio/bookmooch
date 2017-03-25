import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Header from 'view/component/header';
import Footer from 'view/component/footer';
import Stickyside from 'view/component/stickyside';
import AuthModel from 'model/auth';
import CheckoutModel from 'model/checkout';
import Style from 'style/dashboard.scss';

export default class Dashboard extends React.Component{
	constructor(props){
    super(props);
    this._authModel = new AuthModel();
    this._checkoutModel = new CheckoutModel(this._authModel.getUserData());
    this._checkoutModel.subscribe(function(){
      this.setState({userOrderList : this._checkoutModel.userOrderList});
    }, this);
    this._checkoutModel.getOrder();
		//instead of return in getInitialState 
		this.state = {
			userOrderList : []
		};
	}

	componentDidMount(){
		this.refs.stickySide.setTopPoint(0, 60);
		// because of the picture loading, you need to set height manually 
		this.refs.stickySide.setHeight(360);
		this.refs.stickySide.setBottom(this.refs.footer);
		$(window).scrollTop(0);
  }

  _assembleItems(list){
  	list = list || [];
  	// console.log(list);
  	return list.map(function(item){
  		const link = [Config.DIR_RULE, Config.NAV_BOOK, item.product.id].join('/');
  		const quantity = item.quantity > 9 ? item.quantity : '0' + item.quantity;
  		return(
  			<li key={Util.uuid()} className="ellipsis"><a href={link} target="_self">[{quantity} x] {item.product.title}</a></li>
  		);
  	}, this);
  }

	render(){

		const orderListView = this.state.userOrderList.map(function(item, index){
			//
			return(
				<section key={Util.uuid()}>
					<h3># {index + 1} <span>Date: {item.date}</span></h3>
					<ul>
						{this._assembleItems(JSON.parse(item.content))}
					</ul>
				</section>
			);
		}, this);
		//
		return(
			<div>
				<header><Header {...this.props} /></header>
				<main className="container dashboard">
					<div className="row">
						<div className="col-lg-9">
							<div className="category-title">
								<h3>Order List</h3>
							</div>
							<div className="statistics">
								<h5>
									<span>Total: {this.state.userOrderList.length}</span> 
								</h5>
							</div>
							<div className="order-list">
								{orderListView}
							</div>
							<hr />
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
