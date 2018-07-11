import React, { Component } from 'react';
import PublicationList from './publication'

class Wall extends Component
{
    render(){
        let { user } = this.props;
        if(!user)
            return <WallEmmiter />

        let forRender = user ? <PublicationList publications={user.publications}/> : null
        return (forRender)
    }
}


class WallEmmiter extends Component
{
    render(){
        return (
            <div className="publication-list">
                {
                    [0,1,2].map(value => {
                        return (
                            <div key={value} className="publication-wrapper-emmiter publication-wrapper papper">
                                <div className="emmit-publication-tittle">
                                    <div>
                                        <div className="emmit-circle"/>
                                    </div>
                                    <div className="emmit-publication-name">
                                        <div className="emmit-line"/>
                                        <div className="emmit-line"/>
                                    </div>
                                </div>
                                
                                <div className="text-area-emmiter"/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Wall;