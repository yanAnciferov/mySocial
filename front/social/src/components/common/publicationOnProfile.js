import React, { Component } from "react";
import PublicationCreator from "./publicationCreator";


class PublicationOnProfile extends Component {
    render() {
        let { isMyPage } = this.props;
        let forRender = isMyPage ? <PublicationCreator/> : null;
        return (forRender);
    }
}

export default PublicationOnProfile;