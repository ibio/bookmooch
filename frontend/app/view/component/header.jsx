import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Config from 'helper/config';
import Util from 'helper/util';
import AuthModel from 'model/auth';
import Style from 'style/component/header.scss';

export default class Header extends React.Component {
	constructor(props) {
    super(props);
    this._authModel = new AuthModel();
		//instead of return in getInitialState 
		this.state = {
			mainNav : this.props.navs[0],
		};
	}

	componentDidMount(){
		this._fillSearchBox();
		this.refs.keyword.focus();
  }

  componentDidUpdate(prevProps, prevState){
  	if(this.props.navs !== prevProps.navs){
			this._fillSearchBox();
  	}
  }

  _fillSearchBox(){
  	if(this.props.navs[0] === Config.NAV_SEARCH && this.props.navs[1]){
  		this.refs.keyword.value = this.props.navs[1];
  	}else{
  		this.refs.keyword.value = '';
  	}
  }

  _handleSearchClick(e){
  	var keyword = this.refs.keyword.value || '';
  	var temp = keyword.split(' ');
  	keyword = temp.join('+');
  	if(keyword){
  		console.log('search: ' + keyword);
  		document.location.href = [Config.DIR_RULE, Config.NAV_SEARCH, keyword].join('/');
  	}
  }

  _handleKeyUp(e){
  	// enter
  	if(e.keyCode === 13){
  		this._handleSearchClick({});
  	}
  }

  _assembleLink(str){
  	return [Config.DIR_RULE, str].join('/');
  }

  _handleLoginClick(e){
  	if(this._authModel.isLogin()){
  		// logout
  		this._authModel.logout(function(response){
  			// NOTICE: needs to set '/' in order to refresh the page to update current header
  			document.location.href = '/';
  		}, this);
  	}else{
  		document.location.href = this._assembleLink(Config.NAV_LOGIN);
  	}
  }
	
	render(){
		const loginView = this._authModel.isLogin() ? 'Logout' : 'Login';
		//
		return(
			<nav className="navbar navbar-inverse navbar-fixed-top header" ref="header">
			  <div className="container-fluid wrapper">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed toggle-button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand logo" target="_self" href={this._assembleLink(Config.NAV_HOME)}><img className="img-responsive" src={Config.STATIC_ROOT + '/res/logo.png'} /></a>
			    </div>

			    <div className="collapse navbar-collapse main-menu" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
			        <li className={Classnames({active:this.state.mainNav === Config.NAV_HOME})}><a target="_self" href={this._assembleLink(Config.NAV_HOME)}>Home</a></li>
			        <li className={Classnames({active:this.state.mainNav === Config.NAV_DASHBOARD})}><a target="_self" href={this._assembleLink(Config.NAV_DASHBOARD)}>Dashboard</a></li>
			      </ul>

			      <div className="navbar-form navbar-left search-box">
			        <div className="form-group">
			          <input type="text" className="form-control" placeholder="Search" ref="keyword" onKeyUp={this._handleKeyUp.bind(this)} />
			        </div>
			        <button type="button" onClick={this._handleSearchClick.bind(this)} className="btn btn-default"><i className="glyphicon glyphicon-search"></i></button>
			      </div>

			      <ul className="nav navbar-nav navbar-right">
			        <li className="dropdown">
			          <a href="javascript:void(0);" target="_self" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About Us <span className="caret"></span></a>
			          <ul className="dropdown-menu">
			            <li><a target="_self" href="mailto:zhxm68@gmail.com?Subject=Hello%20from%20DatabaseProject">Xiaoming</a></li>
			            <li><a target="_self" href="http://www.dsm.fordham.edu/~yoneda/">Ken</a></li>
			            <li><a target="_self" href="https://ibio.github.io">Tan</a></li>
			          </ul>
			        </li>
			        <li className={Classnames({active:this.state.mainNav === Config.NAV_LOGIN})}><a target="_self" href="javascript:void(0);" onClick={this._handleLoginClick.bind(this)}>{loginView}</a></li>
			      </ul>

			    </div>
			  </div>
			</nav>
		);
	}

}
