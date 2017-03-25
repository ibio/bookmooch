import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'classnames';
import Util from 'helper/util';
import Style from 'style/component/tablist.scss';

export default class Tablist extends React.Component{
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
		var buttons = [];
		var panels = [];
		this.props.list.forEach(function(item, index){
			const prefix = 'tabcomp-';
			buttons.push(<li key={Util.uuid()} role="presentation"><a href={'#'+ prefix + index} aria-controls={item.tab} role="tab" data-toggle="tab">{item.tab}</a></li>);
			panels.push(<div key={Util.uuid()} role="tabpanel" className="tab-pane fade" id={prefix + index} dangerouslySetInnerHTML={{__html:item.content}}></div>);
		}, this);
		//
		return(
		<div className="tablist" ref="tablist">
			<h4>{this.props.title}</h4>
			
			<div>
			  <ul className="nav nav-tabs tab-buttons" role="tablist">
			    {buttons}
			  </ul>
			  <div className="tab-content">
			    {panels}
			  </div>
			</div>

		</div>
		);
	}

}
