import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import { PROFILE_CONSTS } from '../../../constans/profile';
import { PROFILE_CONTENT } from '../../../content/profile';
import { connect } from 'react-redux';


class MainInfo extends React.Component {
  
    render() {
        var { user, app, t } = this.props;   
        var forRender = (user !== null) ? (<MainInfoWithUser localeFormat={app.currentLanguage} t={t} user={user}/>) : ( <MainInfoEmitter/>)
        return (
            <div>
                {forRender}
            </div>
        )
    }
  }

class MainInfoWithUser extends React.Component {

   render() {
        const { user, localeFormat, t, user: { birthdate, sex, email } } = this.props;
        const items = [
            { key: PROFILE_CONTENT.BIRTHDATE_INFO, value: new Date(birthdate).toLocaleDateString(localeFormat, PROFILE_CONSTS.DATE_FORMAT)},
            { key: PROFILE_CONTENT.SEX_INFO, value: t(PROFILE_CONTENT.getSex(sex)) },
            { key: PROFILE_CONTENT.EMAIL_INFO, value: email }
        ]
        const itemsInfo = items.map((item) => <li key={item.key}><InfoItem t={t} item={item} /></li>);
        return (
            <Paper className="main-info-wrapper">
                <div className="main-info-header">
                    <h2 className="main-info-name">{PROFILE_CONTENT.getFullName(user)}</h2>
                </div>
                <div className="main-info-main">
                    <Grid>
                        <ul>
                            {itemsInfo}
                        </ul>
                    </Grid>
                </div>
            </Paper>
        )
    }
}


class InfoItem extends React.Component{
    render(){
        var { item, t } = this.props;
        return(
            <Grid key container spacing={24}>
                <Grid className="info-key" item xs={4}>
                    {t(item.key)}:
                </Grid>
                <Grid className="info-value" item xs={8}>
                    {item.value}
                </Grid>
            </Grid>
        )
    }
}


class MainInfoEmitter extends React.Component {

    render() {
        return (
            <Paper className="main-info-wrapper">
                
            </Paper>
        )
    }
}

export default connect(
    state => ({
        app: state.app
    })
)(MainInfo);