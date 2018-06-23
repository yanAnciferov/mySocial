import React from 'react';


class CircleAvatar extends React.Component {
    render() {
      return (
       <div>
           <div className="circle-avatar">
              <img src={this.props.imageUrl} alt="avatar" />
           </div>
       </div>
      )
    }
  }


export default CircleAvatar;