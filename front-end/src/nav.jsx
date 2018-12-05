import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {partial} from "./App";

class Nav extends Component {
    static propTypes = {
        navOptions: PropTypes.array,
        changePage: PropTypes.func,
        logOut: PropTypes.func,
        name: PropTypes.string

    };

    render() {
        return (
            <div className="nav">
                {this.props.navOptions.map((option) => (
                    <button key={option} onClick={partial(this.props.changePage, option)}>{option}</button>
                ))}
                {!!this.props.name ? [
                        <p key={this.props.name}>{"Hi " + this.props.name}</p>,
                        <button key={this.props.name + "B"} onClick={this.props.logOut}>{"Log Out"}</button>
                    ] : null
                }
            </div>
        );
    }
}

export {Nav};