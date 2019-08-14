import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileList extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.showMsgRef = React.createRef();
        // this.showMsgRef = null;
        this.state = {
            value: ''
        }
    }


    renderItemClassName(profile, index) {
        let result = profile.className;
        if (profile.isEdit)
            result += " custom";
        else
            result += " no-edit " + profile.text;
        if (index === this.props.current)
            result += " active";
        return result;

    }

    handleSelectAction = (select) => {

        switch (select) {
            case "Up":
                this.props.actionUp();
                break;
            case "Down":
                this.props.actionDown();
                break;
            case "Edit":
                this.setState({
                    value: this.props.profiles[this.props.current].text
                }, () => this.actionEdit());
                break;
            case "Delete":
                //this.setState({ showMsg: true })
                this.Delete();
                break;
            case "Add":
                this.props.actionAdd()
                // , () => {
                //     let element = document.getElementById("profileList");
                //     element.scrollTo(0, 99999)
                // }
                break;
            default: break;
        }
    }
    // edit input
    cloneData = (item) => {
        return JSON.parse(JSON.stringify(item));
    }

    actionEdit = () => {
        this.inputRef.current.classList.add('show');
        this.inputRef.current.select()
    }

    exitInput = (e) => {
        this.inputRef.current.classList.remove('show');
        this.props.handleNameChange(e)
        this.setState({
            value: this.props.profiles[this.props.current].text
        })
    }

    keyExitInput = e => {
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.inputRef.current.blur();
        }
    }

    // showMsgDelete
    Delete = () => {
        this.showMsgRef.current.classList.add('show');
        this.showMsgRef.current.focus();
    }

    DeleteItem = () => {
        this.props.deleteCurrentProfile();
        this.showMsgRef.current.classList.remove('show');
    }

    exitShowMgs = () => {
        this.showMsgRef.current.classList.remove('show');
    }
    componentWillUnmount = () => {
        this.inputRef.current.removeEventListener('keydown', this.keyExitInput);
    }

    componentDidMount = () => {
        this.inputRef.current.addEventListener('keydown', this.keyExitInput);
        this.setState({
            value: this.props.profiles[this.props.current].text
        });
        // close popup
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = e => {
        console.log("NGH")
        let popUpDel = document.getElementById('profileDelCfm');
        let dom = e.target;
        if (popUpDel !== dom && popUpDel !== e.target.offsetParent) {
            this.showMsgRef.current.classList.remove('show');
        }
    };

    // scroll khi add new
    componentDidUpdate(prevprops) {
        let element = document.getElementById("profileList");
        let child = element.getElementsByClassName("active");
        let a = child[0].getBoundingClientRect()
        if (a.top <= 80) {
            element.scrollTo(0, child[0].offsetTop - 60)
        }
        if (prevprops.profiles.length < this.props.profiles.length) {
            element.scrollTo(0, 99999)
        }
    }

    handleSetCurrentName = () => {
        this.props.currentName(this.state.value)
    }

    render() {
        return (
            <div id="profileWrapper" className="drawer-select flex">
                {/* profileList */}
                <div id="profileList" className="scrollable">
                    {this.props.profiles.map((profile, index) => {
                        return <div
                            key={index}
                            id={profile.id}
                            type={profile.type}
                            className={this.renderItemClassName(profile, index)}
                            onClick={() => this.props.actionChoose(index)}
                        // style={{ position: 'relative' }}
                        >
                            {profile.text}
                        </div>
                    })}
                    <input

                        id="profileRename"
                        className="profile-item"
                        placeholder="Enter Profile Name"
                        maxLength={25}
                        ref={this.inputRef}
                        defaultValue={this.props.profiles[this.props.current].text}
                        value={this.state.value}
                        // onChange={this.props.handleNameChange}
                        onChange={() => this.setState({ value: this.inputRef.current.value }, this.handleSetCurrentName)}
                        style={{ top: this.props.current * 30 }}
                        onBlur={this.exitInput}
                    />
                </div>



                {/* Toolbar */}
                <div className="toolbar flex">
                    {this.props.icons.map((icon, index) => {
                        let a = this.props.profiles[this.props.current];


                        if (this.props.current === 0) {
                            if (a.type === 'custom') {
                                return <div
                                    id={icon.type}
                                    className={icon.type === 'Up' ? [icon.className, 'disabled'].join(' ') : [icon.className, 'show'].join(' ')}
                                    onClick={() => { this.handleSelectAction(icon.type) }} key={index}
                                >

                                </div>
                            }
                            return <div
                                id={icon.type}
                                className={icon.type === 'Up' ? [icon.className, 'disabled'].join(' ') : icon.className}
                                onClick={() => { this.handleSelectAction(icon.type) }} key={index}
                            >

                            </div>
                        }
                        if (this.props.current === this.props.profiles.length - 1) {
                            if (a.type === 'custom') {
                                return <div
                                    id={icon.type}
                                    className={icon.type === 'Down' ? [icon.className, 'disabled'].join(' ') : [icon.className, 'show'].join(' ')}
                                    onClick={() => { this.handleSelectAction(icon.type) }} key={index}
                                >

                                </div>
                            }
                            return <div
                                id={icon.type}
                                className={icon.type === 'Down' ? [icon.className, 'disabled'].join(' ') : icon.className}
                                onClick={() => { this.handleSelectAction(icon.type) }} key={index}
                            >

                            </div>

                        }

                        if (a.type === 'custom') {
                            return <div id={icon.type}
                                className={[icon.className, 'show'].join(' ')}
                                onClick={() => { this.handleSelectAction(icon.type) }} key={index}

                            >

                            </div>
                        }


                        return <div
                            id={icon.type}
                            className={icon.className}
                            onClick={() => { this.handleSelectAction(icon.type) }} key={index}
                        >

                        </div>
                    })}
                </div>

                {/* Show  showMsgDelete*/}

                <div id="profileDelCfm" ref={this.showMsgRef}
                    className="profile-del alert flex"
                // onBlur={this.exitShowMgs}
                // tabIndex='0'
                >
                    <div className="title">delete eq</div>
                    <div className="body-text t-center" id="delName">{this.props.profiles[this.props.current].text}</div>
                    <div className="thx-btn" id="cfmDelete" onClick={this.DeleteItem} >delete</div>
                </div>
            </div>


        )
    }
}
const mapStateToProps = state => {
    return {
        state: state,
        profiles: state.profiles,
        icons: state.icons,
        current: state.current,
        showMsgDelete: state.showMsgDelete
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actionChoose: (val) => dispatch({ type: 'choose', index: val }),
        actionAdd: () => dispatch({ type: 'addProfile' }),
        actionUp: () => dispatch({ type: 'upProfile' }),
        actionDown: () => dispatch({ type: 'downProfile' }),
        handleNameChange: (val) => dispatch({ type: 'handleNameChange', e: val }),
        deleteCurrentProfile: () => dispatch({ type: 'deleteProfile' }),

        // onAutoSave: ( val) => dispatch(onAutoSave(val)),
        // clearTime: () => dispatch(clearTime()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);