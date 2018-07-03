import React from 'react';
import { socketOn } from "../../../socket"
import Link from 'react-router-dom/Link';
import connect from 'react-redux/lib/connect/connect';
import { ACTION_FOR_APP } from '../../../constans/ActionTypes';
import { PROFILE_CONTENT } from '../../../content/profile';
import { onAddMessage, onIncomingMessage } from '../../../content/message';
import { INCOMING, ACCEPT, OUTGOING, ACCEPTED } from '../../../constans/socketEvents';


class MessageQueue extends React.Component {

    componentWillMount(){
        socketOn(INCOMING,({subscriber})=>{
            this.props.onIncoming(subscriber);
            console.log(subscriber);
            this.addMessage({
                header: onIncomingMessage.header,
                imageUrl: subscriber.minAvatar,
                link: `/${subscriber._id}`,
                textLink: PROFILE_CONTENT.getFullName(subscriber),
                message: onIncomingMessage.message
            });
        });

        socketOn(ACCEPT,({subscriber})=>{
            this.props.onAccept(subscriber);
            console.log(subscriber);
            this.addMessage({
                header: onAddMessage.header,
                imageUrl: subscriber.minAvatar,
                link: `/${subscriber._id}`,
                textLink: PROFILE_CONTENT.getFullName(subscriber),
                message: onAddMessage.message
            });
        });


        socketOn(OUTGOING,({subscribed})=>{
           this.props.onOutgoing(subscribed);
        })

        socketOn(ACCEPTED,({subscribed})=>{
            this.props.onAccepted(subscribed);
        })

       
    }


    addMessage(newMess){
        
        let mess = this.state.messages;
        mess.push(newMess);
        this.setState({messages: mess});

        setTimeout(() => {
            this.state.messages.shift()
            this.setState({
                messages: this.state.messages
            })
        }, 10000)
    }

    state = {
        messages: []
    }

    render() {
      return (
       <div className="messageQueue">
           <ul>
           {
               this.state.messages.map((value, index) => {
                   return (
                    <li key={index}>
                       <Message {...value} />
                    </li>
                    )
               })
           }
           </ul>
       </div>
      )
    }
  }

  class Message extends React.Component {

    render()
    {
        let { header, link, textLink, imageUrl, message  } = this.props;
        return (
            <div className="message">
                <div className="message-header">
                    {header}
                </div>
                <div className="message-body">
                    <div className="message-avatar">
                        <img src={imageUrl} alt="ava"/>
                    </div>
                    <div className="message-text">
                        <Link to={`${link}`}>
                        {textLink}
                        </Link>
                        {message}
                    </div>
                    
                </div>
            </div>
        )
    }
}


  export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      onIncoming: (subscriber) => {
        dispatch({ type: ACTION_FOR_APP.ON_INCOMING, payload: subscriber });
      },
      onOutgoing: (subscriber) => {
        dispatch({ type: ACTION_FOR_APP.ON_OUTGOING, payload: subscriber });
      },
      onAccepted: (subscriber) => {
        dispatch({ type: ACTION_FOR_APP.ON_ACCEPT, payload: subscriber });
      },
      onAccept: (subscriber) => {
        dispatch({ type: ACTION_FOR_APP.ON_ACCEPTED, payload: subscriber });
      }
  })
)(MessageQueue);