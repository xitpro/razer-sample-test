import React, { Component } from 'react';
import { connect } from 'react-redux';
class Contains extends Component {

    render(){
        console.log(this.props.profiles);
        return(
            <div className="thx-window">
                <div className="sub-title flex">
                    <h1 id="eqTitle" className="eq-title">
                    {this.props.profiles[this.props.current].text}
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

export default connect(mapStateToProps)(Contains);