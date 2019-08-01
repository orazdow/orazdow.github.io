
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';


if(window.devicePixelRatio > 1){
	document.documentElement.style.transform = 'scale('+(1/window.devicePixelRatio)+')';
	document.documentElement.style.transformOrigin = 'top';
} 

class Main extends Component{

	render(){
		return  <App/>;
	}

}

ReactDOM.render(<Main />, document.getElementById('root'));



