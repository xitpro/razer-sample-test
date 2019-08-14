import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {

    render() {
        const name = this.props.profiles[this.props.current].text;
        return (
            <div className="thx-window">
                <div className="sub-title flex">
                    <h1 id="eqTitle" className="eq-title">
                        {this.props.currentName || name}
                    </h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        current: state.current,
    }
};

export default connect(mapStateToProps)(Content);