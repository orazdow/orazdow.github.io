import React, { Component } from 'react';
import {Menu} from './Menu';
import ReactMarkdown from 'react-markdown';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../styles/style.css';
import '../styles/style2.css';

import arr_main from '../posts/posts_main.json';
import arr_projects from '../posts/posts_projects.json';
import arr_about from '../posts/posts_about.json';

const clickPosts = true;


class Post extends Component{

    constructor(props){
        super(props);
        this.state = {expand : clickPosts ? !this.props.entry.minimize : true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          expand: !state.expand
        }));
    }

    render(){
        if(this.state.expand || this.props.entry.static){
            return <li className="post post-max" onClick={clickPosts ? this.handleClick : null}><ReactMarkdown source={this.props.entry.content} /></li>;
        }else{
            return(<li className="post post-min" onClick={clickPosts ? this.handleClick : null}>
            <h5 className="min-heading">{this.props.entry.title}</h5>  
            <p className="min-desc">{this.props.entry.description}</p> 
            <p className="min-date"><small>{this.props.entry.date}</small></p>      
            </li>);
        }

    }
}


function PostContent(props){

        let listItems;

        switch(props.selection){
            case 'main' :
                listItems = arr_main.map((_entry, i) =>
                    <Post key={i+props.selection} entry={_entry} />
                );
            break;
            case 'projects' :
                listItems = arr_projects.map((_entry, i) =>
                    <Post key={i+props.selection} entry={_entry}/>
                );
            break;
            case 'about' :
                listItems = arr_about.map((_entry, i) =>
                    <Post key={i+props.selection} entry={_entry}/>
                );
            break;
        }


        return (
            <ul>{listItems}</ul>
        );

}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {selection : 'main'};

        this.stateChange = this.stateChange.bind(this);
        this.onPopState = this.onPopState.bind(this);
        window.onpopstate = this.onPopState;
        
        let loadroute = window.location.href.split('#')[1];
        if(loadroute == undefined || loadroute == '')
            loadroute = 'main';
            
        this.state.selection = loadroute;
    }

    onPopState(event){

        let loadroute = window.location.href.split('#')[1];
        if(loadroute == undefined || loadroute == '')
            loadroute = 'main';

        this.stateChange(loadroute);
    }


    stateChange(arg){
        this.setState({selection: arg});
    }


    render() {
        return (
            <div className="App">
                <div className="container main_div">
                    <Menu stateChange={this.stateChange} menuSelection={this.state.selection}/>
                    <PostContent selection={this.state.selection}/>
                </div>
            </div>
        );
    }
}

export {
	App
}
