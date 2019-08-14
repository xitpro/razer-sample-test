import React, { Component } from 'react';
import ProfileList from './ProfileList';
import Content from './../../components/Layout/Content/Content';


class HorizontalNav extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    currentName = (name) => {
        this.setState({
            value: name
        })
    }

    render() {
        return (
            <>
                <div className="thx-drawer flex">
                    <div className="main-title">
                        Profile List
                </div>
                    <ProfileList
                        currentName={this.currentName}
                    />
                </div>
                <Content
                    currentName={this.state.value}
                />
            </>
        );
    }
}
export default HorizontalNav;