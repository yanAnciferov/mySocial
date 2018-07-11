import React from 'react';


class CircleAvatar extends React.Component {
    render() {
      let { user } = this.props;
      if(!user)
        return <div className="emmit-circle" />
      return (
       <div>
           <div className="circle-avatar">
              <img src={user.minAvatar} alt="avatar" />
           </div>
       </div>
      )
    }
  }

export default CircleAvatar;