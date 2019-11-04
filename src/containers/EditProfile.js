import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {TextField,FormControl,FormControlLabel,RadioGroup,Radio, FormLabel} from '@material-ui/core';
import {changeProfile} from '../actions/user.action';

class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state ={}
    }
   
    componentDidMount(){
        const {user} = this.props.user;
        if(user){
            // const date =  await parse(
            //     user.dob,
            //     'MM/dd/yyyy'
            //   );
            this.setState({...this.state, 
            username: user.username,
            dob: user.dob,
            gender: user.gender,
            full_name: user.full_name,
        },console.log(this.props))
        }
    }

    handleChange = async event => {
        this.setState({...this.state,
            [event.target.name]: event.target.value,
        });  
    }
    
    handleSubmit = event => {
        const {editProfile} = this.props;
        event.preventDefault()
        const {username, full_name, dob, gender, errorMessage} = this.state;
        const user= {username, full_name, dob, gender};
        if( !errorMessage && username && full_name && dob && gender){
            console.log("submit");
            editProfile(user);
        }
    }

    handleDateChange = async date => {
        const result = await format(
            date,
            'MM/dd/yyyy'
          );
        this.setState({...this.state, dob:result});
      };

    render() {
        const {errorMessage} = this.state

        return (
            <form className="d-flex flex-column align-items-center d-block">
                <div className="d-block">
                <TextField className="field-width" type="text" name="full_name" value={this.state.full_name} onChange={this.handleChange} placeholder="Full Name" id="input-with-icon-grid" label="Full name" />
                </div>
                
                <FormControl className="field-width mt-15"  controlId="formHorizontalGender">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup  aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange}
                    className ="d-flex flex-row justify-content-start" label="Gender"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio color="primary" />}
                            label="Female"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio color="primary" />}
                            label="Male"
                            labelPlacement="start"
                        />
                </RadioGroup>
                </FormControl >

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className="field-width"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date of birth"
                            format="MM/dd/yyyy"
                            name="dob"
                            value={this.state.dob}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
               
                <button type="submit" className="my-btn" onClick={(event) => this.handleSubmit(event)}>Update</button>
                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </form>
        )
    }
}

const mapStateToProps = state =>({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editProfile: changeProfile
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);