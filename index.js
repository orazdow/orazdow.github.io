
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';


if(window.devicePixelRatio > 1){
	document.documentElement.style.transform = 'scale('+(1/window.devicePixelRatio)+')';
	document.documentElement.style.transformOrigin = 'top';
}

function check_firefox(){
	if(navigator.userAgent.indexOf('Firefox') > -1 ){		
		let gh = document.querySelector("#ghbutton");
		if(gh){
			gh.classList.remove('fa-github');
			gh.classList.add('gh');
			console.log('replacing github svg in firefox');
		}
	}
} 


class Main extends Component{

	componentDidMount(){
		check_firefox();
	}

	render(){
		return  <App/>;
	}

}

ReactDOM.render(<Main />, document.getElementById('root'));



