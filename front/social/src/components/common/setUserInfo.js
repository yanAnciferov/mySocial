import React, { Component } from 'react';
import Content from "../../content/registration"
import { MODEL_NAMES, DATE } from '../../constans/registration';

import { Button, Grid  } from '@material-ui/core'; 
import TextFormControl from './textFormControl';
import SelectGenderControl from './selectGender'

class SetUserInfo extends Component {
    
    render() {

        let { sex, email, firstname, surname, parrentname, birthdate } = this.props.source.validateState;
        let { onSubmit, fieldChange, buttonText } = this.props;
        let state = {
            ...this.props.source
        };

        return (
        <form>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                <TextFormControl
                    value={state.firstname}
                    label={Content.NameLabel} 
                    message={firstname.message} 
                    onChange={(e) => fieldChange(MODEL_NAMES.FIRSTNAME,e)} 
                    isError={firstname.isError} 
                    fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFormControl
                        value={state.surname}
                        label={Content.SurameLabel} 
                        message={surname.message} 
                        onChange={(e) => fieldChange(MODEL_NAMES.SURNAME,e)} 
                        isError={surname.isError} 
                        fullWidth/>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                <TextFormControl
                        value={state.parrentname}
                        label={Content.ParrentnameLabel} 
                        message={parrentname.message} 
                        onChange={(e) => fieldChange(MODEL_NAMES.PARRENTNAME,e)} 
                        isError={parrentname.isError} 
                        fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
            </Grid>
            <Grid  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <TextFormControl 
                    value={state.email}
                    label={Content.EmailLabel} 
                    message={email.message} 
                    onChange={(e) => fieldChange(MODEL_NAMES.EMAIL,e)} 
                    isError={email.isError} 
                    fullWidth/>
                </Grid>
            </Grid>
            <Grid className="grid-row"  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <TextFormControl
                    value={state.birthdate}
                    message={birthdate.message} 
                    onChange={(e) => fieldChange(MODEL_NAMES.BIRTHDATE,e)} 
                    isError={birthdate.isError} 
                    fullWidth
                    type="date"
                    inputProps= {{
                        min: DATE.MIN,
                        max: DATE.MAX
                    }}/>
                </Grid>
            </Grid>
                
            <Grid className="grid-row"  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <SelectGenderControl 
                isError={sex.isError} 
                value={state.sex} 
                fieldCange={(e) => fieldChange(MODEL_NAMES.SEX,e)} 
                message={sex.message} />

                </Grid>
            </Grid>
                
            
            <Grid container justify="flex-end">
                <Button onClick={onSubmit} type="submit" variant="contained" color="primary">{buttonText}</Button>
            </Grid> 
        </form>
        )
    }
}

export default SetUserInfo;




