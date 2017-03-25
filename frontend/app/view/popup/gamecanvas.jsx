import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';

//NOTICE: this class is for popup body use only
export default class GameCanvas extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      itemList : [],
      selectIds : null
    };
  }

  componentDidMount(){
    console.log($(this.refs.body).outerWidth());
  }

  //for pupoup use
  getData(){
    return null;
  }

  isReadyDismiss(){
    return true;
  }

  _handleAddClick(e){
    
  }

  _handleGameLoaded(e){
    // console.log($(e.currentTarget).outerWidth());
    console.log(e.currentTarget);
    console.log($(this.refs.game));
  }

  _handleItemClick(currentId){
    
  }

	render(){
    return(
			<div className="game-canvas">
        <iframe type="text/html" src="res/game/index.html" ref="body" />
      </div>
		);
	}

}