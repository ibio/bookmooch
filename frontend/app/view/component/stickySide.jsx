import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Config from 'helper/config';
import Style from 'style/component/stickyside.scss';

const STICKY_SIDE_TOP = 60;
const SCREEN_LG_MIN = 1200;

export default class StickySide extends React.Component{
	constructor(props){
    super(props);
    this._$stickySide;
    this._sideOffset;
    this._topY = 0;
    this._parentY = 0;
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
  // topY: the gap between stickySide and its parent
  // parentY: the gap between stickySide's parent and the document
  setTopPoint(topY, parentY){
  	this._topY = topY;
  	this._parentY = parentY;
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
  		bottomEdge = this._$bottom.offset().top - this._parentY - this._height;
	  	if(y <= this._topY){
	  		this._$stickySide.css({position:'static'});
	  	}else if(y > this._topY && y < bottomEdge){
	  		this._$stickySide.css({position:'fixed', left:this._sideOffset.left, top: STICKY_SIDE_TOP, width: this._sideOffset.width});
	  	}else{
	  		actualY = bottomEdge - this._topY;
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
