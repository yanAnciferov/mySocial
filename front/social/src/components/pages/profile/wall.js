import React, { Component } from 'react';
import PublicationList from './publication'

class Wall extends Component
{
    render(){
        let { user } = this.props;
        let forRender = user ? <PublicationList publications={user.publications}/> : null
        return (forRender)
    }
}

export default Wall;