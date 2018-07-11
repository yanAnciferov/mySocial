import React, { Component } from "react";
import PublicationCreator from "./publicationCreator";


class PublicationOnProfile extends Component {
    render() {
        let { isMyPage, user } = this.props;
        if(!user)
            return <PublicationCreatorEmmit />
        let forRender = isMyPage ? <PublicationCreator/> : null;
        return (forRender);
    }
}


class PublicationCreatorEmmit extends Component{
    render(){
        return (
            <div className="pubcreate-wrapper papper">
            <div>
                <div className="text-area-emmiter"/>
                <div className="button-emmiter" />
            </div>
        </div>
        )
    }
}

export default PublicationOnProfile;