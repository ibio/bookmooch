import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Config from 'helper/config';
import Util from 'helper/util';
import Style from 'style/component/footer.scss';

export default class Footer extends React.Component {
	constructor(props) {
    super(props);
		//instead of return in getInitialState 
		this.state = {
			
		};
	}

	componentDidMount(){
		
  }

  componentWillUnmount (){
  }
	
	render(){
		//
		return(
			<div className="footer">
				<div className="container social-box">
					<div className="clearfix">
						<div className="pull-left copyright">
							<p>Copyright © 2017 BookMooch* Study Purpose Only. All Rights Reserved.</p>
							<p>
								<a href="http://bookmooch.com/">The real BookMooch Website</a>
								<span>/</span>
								<a href="http://storm.cis.fordham.edu/~yli/CISC6345Spring17.html">For CISC6345(Advanced Database System) Project</a>
							</p>
						</div>
						<div className="pull-right socialmedia">
							<div className="clearfix si-share si-borderless social-share">
								<div>
									<a href="https://www.facebook.com/ibio520" className="social-icon si-borderless si-facebook">
										<i className="icon-facebook"></i>
										<i className="icon-facebook"></i>
									</a>
									<a href="https://twitter.com/ibio520" className="social-icon si-borderless si-twitter">
										<i className="icon-twitter"></i>
										<i className="icon-twitter"></i>
									</a>
									<a href="https://www.youtube.com/playlist?list=PLc4Nv2DPFCTWk84hm-FClf44GCFVlL4Lv" className="social-icon si-borderless si-youtube">
										<i className="icon-youtube"></i>
										<i className="icon-youtube"></i>
									</a>
									<a href="https://www.instagram.com/ibio520/?hl=en" className="social-icon si-borderless si-instagram">
										<i className="icon-instagram"></i>
										<i className="icon-instagram"></i>
									</a>
								</div>
							</div>
							<p className="support">
								<a href="mailto:ibio520@hotmail.com">
								  <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
								  ibio520#hotmail.com
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
