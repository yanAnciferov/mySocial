import React, { Component } from 'react';
import UserCard from "./userCard"

class UsersList extends Component {

    render() {
      
      let { usersList, t } = this.props;
      return (
        <div >
           {usersList.map((value, index) => {
               return <li key={index}><UserCard t={t} user={value}/></li>
           })}
        </div>
      );
    }
}


export default UsersList
