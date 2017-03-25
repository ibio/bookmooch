import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Style from 'style/component/flexslide.scss';

export default class FlexSlide extends React.Component{
	constructor(props){
    super(props);
    
		this.state = {
			itemList : [],
			index: 0
		};
	}

	componentDidMount(){
		//
  }

  componentDidUpdate(prevProps, prevState){
  	if(this.props.mediaList !== prevProps.mediaList){
  		this.setState({itemList:this.props.mediaList});
  		// in order to wait for rendering
  		setTimeout(this._updateSlide.bind(this), 100);
  	}
  }

  _updateSlide(){
  	const self = this;
  	$(this.refs.thumbList).children().each(function(index){
  		var obj = self.state.itemList[index];
			// real width ratio > real height ratio
			// console.log($(this).width() / obj.thumbW, $(this).height() / obj.thumbH)
  		if($(this).width() / obj.thumbW > $(this).height() / obj.thumbH){
  			$(this).find('img').css({width:'100%', height:'unset'});
  		}
  	});
  	//
  	$(this.refs.image).css({opacity:1});	
  }

  _handleThumbClick(index){
  	this.setState({index: index});
  	$(this.refs.image).css('opacity', '');
  	// make sure it's as same as the animation
  	setTimeout(this._updateSlide.bind(this), 300);
  }
  
	render(){
		const thumbsView = this.state.itemList.map(function(item, index){
			return(
				<li key={Util.uuid()}>
					<a className={Classnames({'active':this.state.index === index})} href="javascript:void(0);" onClick={this._handleThumbClick.bind(this, index)}><img className="img-responsive" src={item.thumb} /></a>
				</li>	
			);
		}, this);
		var image, title, targetLink;
		//
		if(this.state.itemList[this.state.index]){
			title = this.state.itemList[this.state.index].title;
			image = this.state.itemList[this.state.index].image;
			targetLink = [Config.DIR_RULE, Config.NAV_ARTICLE, this.state.itemList[this.state.index].target].join('/');
		}
		//
		return(
			<figure className="flex-slide">
				<figcaption>
					<h2 className="ellipsis">{title}</h2>
				</figcaption>
				<div className="slide-box">
					<a href={targetLink}><img ref="image" className="img-responsive" src={image} /></a>
				</div>
				<ul ref="thumbList">
					{thumbsView}
				</ul>
			</figure>
		);
	}

}
