import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import Avatar from 'react-avatar-edit';
import {uploadAvatar} from '../actions/user.action';
import default_avatar from '../img/default_avatar.jpg';

class UploadAvatar extends Component {

    constructor(props) {
        super(props)
        const {user} = props || {};
        const {avatar} = user ||default_avatar;

        this.state = {
          preview: null,
          src : avatar
        }
      }
      
      onClose=()=> {
        this.setState({preview: null})
      }
      
      onCrop=(preview)=> {
        this.setState({preview})
      }
     
      onBeforeFileLoad=(e)=> {
        if(e.target.files[0].size > 500000){
          alert("File is too big!");
          e.target.value = "";
        };
      }

      saveAvatar=(e)=>{
        e.preventDefault();
        const {user} = this.props;
        user['avatar'] = this.state.preview;
        console.log(user);
        this.props.handleUpLoadAvatar(user);
      }
      
      render () {
        const src = this.props.user.avatar ||  default_avatar;
        const {preview} = this.state;
        return (
          <section className="container">
              <section id="form-ui">
            <div className="form-name text-center">Change your avatar</div>
            <form className="d-flex flex-column align-items-center">
                <div className="d-block">
                    <Avatar
                    width={390}
                    height={295}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={src}
                    />
                  </div>
                    {preview&&<img className="d-block mt-3" src={preview} alt="Preview" />}
                <button className="my-btn" type="submit" onClick={this.saveAvatar}>Save</button>
            </form>
            </section>
          </section>
        
          
        )
      }
}

const mapStateToProps = state =>({
    user: state.user.user
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleUpLoadAvatar:uploadAvatar
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);