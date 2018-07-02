import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import TextFormControl from "../../common/textFormControl"
import UserCard from "./userCard"

class UsersList extends Component {

    render() {
      
      let { usersList, onSubsribed, onAccept } = this.props;
      return (
        <div >
           {usersList.map((value, index) => {
               return <li key={index}><UserCard onAccept={onAccept} onSubsribed={onSubsribed} user={value}/></li>
           })}
        </div>
      );
    }
}


export default UsersList
