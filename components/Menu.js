import React, { Component } from 'react';

const maintitle="Ollie Razdow";
const sub1title=" projects ";
const sub1title_="[projects]";
const sub2title=" about ";
const sub2title_="[about]";


const boldStyle = {
    fontWeight: 700
};

const ghStyle = {
    fontSize: '24px',
    color: 'black'
};


function MenuMain(props){
	return(
		<a href="#" onClick={()=>props.clickCb(props.selection)}><span style={boldStyle}>{props.title}</span></a>
	);
}

function MenuSub(props){
	return(
		<small>
		<a href={"#"+props.selection} onClick={()=>props.clickCb(props.selection)}>{props.title}</a>
		</small>
	);
}
//className="fa fa-github"
//className="fa gh"
function MenuGh(props){
	return(
		<small>
		 <a className="fa fa-github" style={ghStyle}  href="https://www.github.com/orazdow"></a>
		</small>
	);
}


class Menu extends Component{


	render(){
		let sel = this.props.menuSelection;

		return(

			<header className="masthead">
			   <div className="masthead-title">

				   	<MenuMain title={maintitle} clickCb={this.props.stateChange} selection='main'/>
				   	&nbsp; &nbsp;&nbsp;&nbsp;
				   	<MenuSub title={(sel == 'projects') ? sub1title_ : sub1title} clickCb={this.props.stateChange} selection='projects'/>
				   	&nbsp; &nbsp;&nbsp;&nbsp;
				   	<MenuSub title={(sel == 'about') ? sub2title_ : sub2title} clickCb={this.props.stateChange} selection='about'/>
				   	&nbsp; &nbsp;&nbsp;&nbsp;
				   	<MenuGh/>

			   </div>
			</header>

		);		
	}

}

export {Menu}