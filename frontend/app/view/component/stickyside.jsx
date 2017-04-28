import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Style from 'style/component/stickyside.scss';

const STICKY_FIXED_TOP = 60;
const SCREEN_LG_MIN = 1200;

export default class StickySide extends React.Component{
	constructor(props){
    super(props);
    this._$stickySide;
    this._sideOffset;
    this._posTopY = 0;
    this._fixedTopY = STICKY_FIXED_TOP;
    this._height = 0;
    this._$bottom;
	}

	componentDidMount(){
		// cache stickySide for high speed
		this._$stickySide = $(this.refs.stickySide);
		// record current offset
		this._sideOffset = this._$stickySide.offset();
		this._sideOffset.width = this._$stickySide.outerWidth();
		this._height = this._$stickySide.outerHeight(true);
		//
		if(Util.isMobile() || $(document).width() < SCREEN_LG_MIN){
			this._$stickySide.css({position:'static'});
		}else{
			$(window).scroll(this._onWindowScroll.bind(this));
		}		
  }

  // relative the next parent with non-static positioning.
  // posTopY: the gap between stickySide and its parent
  // fixedTopY: the gap between fixed stickySide and the document top (usually the header's height)
  setTopPoint(posTopY, fixedTopY){
  	this._posTopY = posTopY;
  	this._fixedTopY = fixedTopY;
  }

  setHeight(x){
  	this._height = x;
  }

  setBottom(bottom){
  	this._$bottom = $(bottom);
  }

  _onWindowScroll(){
  	const y = $(window).scrollTop();
  	var bottomEdge, actualY;
  	if(this._$bottom){
  		bottomEdge = this._$bottom.offset().top - this._fixedTopY - this._height;
	  	if(y <= this._posTopY){
	  		this._$stickySide.css({position:'static'});
	  	}else if(y > this._posTopY && y < bottomEdge){
	  		this._$stickySide.css({position:'fixed', left:this._sideOffset.left, top: this._fixedTopY, width: this._sideOffset.width});
	  	}else{
	  		actualY = bottomEdge - this._posTopY;
	  		this._$stickySide.css({position:'absolute', left:'', top:actualY});
	  	}
  	}
  }

	render(){
		return(
      <div className="stickyside" ref="stickySide">
        <h4 className="side-title">Grand Opening</h4>
        <p className="side-intro">
          <a href={Config.DIR_RULE + "/search/computer+science"} ><img src={'res/happy-shopping.png'} className="img-responsive" /></a>
        </p>
        <hr />
      </div>
    );
	}

}
