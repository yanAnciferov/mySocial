import React from 'react';
import { socketOn } from "../../../socket"
import Link from 'react-router-dom/Link';
import connect from 'react-redux/lib/connect/connect';
import { ACTION_FOR_APP, ACTION_FROM_SERVER } from '../../../constans/ActionTypes';
import { PROFILE_CONTENT } from '../../../content/profile';
import { onAddMessage, onIncomingMessage } from '../../../content/message';
import { INCOMING, ACCEPT, OUTGOING, ACCEPTED } from '../../../constans/socketEvents';
import { translate } from 'react-i18next';


class MessageQueue extends React.Component {

    componentWillMount(){

        let { toIncoming, toOutgoing, toFriend, toNoFriend, onNewPublication, app} = this.props;
        socketOn(INCOMING,({user})=>{
            toIncoming(user);
            this.addMessage({
                header: onIncomingMessage.header,
                imageUrl: user.minAvatar,
                link: `/${user._id}`,
                textLink: PROFILE_CONTENT.getFullName(user),
                message: onIncomingMessage.message
            });
        });

        socketOn(ACCEPT,({user})=>{
            toFriend(user, app.authorizedUser);          
        });


        socketOn(OUTGOING,({user})=>{
           toOutgoing(user, app.authorizedUser);
        });

        socketOn(ACCEPTED,({user})=>{
            toFriend(user, app.authorizedUser);
            this.addMessage({
                header: onAddMessage.header,
                imageUrl: user.minAvatar,
                link: `/${user._id}`,
                textLink: PROFILE_CONTENT.getFullName(user),
                message: onAddMessage.message
            });
        });

        socketOn('rejected',({user})=>{
            toNoFriend(user, app.authorizedUser)
         });
 
         socketOn('removed',({user})=>{
            toIncoming(user, app.authorizedUser);
         });

         socketOn('reject',({user})=>{
            toNoFriend(user, app.authorizedUser);
         });
 
         socketOn('remove',({user})=>{
            toOutgoing(user, app.authorizedUser);
         });

        socketOn("newPublication", (data) => {
            onNewPublication(data.publication);
        });
       
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
        let { t } = this.props;
      return (
       <div className="messageQueue">
           <ul>
           {
               this.state.messages.map((value, index) => {
                   return (
                    <li key={index}>
                       <Message t={t} {...value} />
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
        let { header, link, textLink, imageUrl, message, t  } = this.props;
        return (
            <div className="message">
                <div className="message-header">
                    {t(header)}
                </div>
                <div className="message-body">
                    <div className="message-avatar">
                        <img src={imageUrl} alt="ava"/>
                    </div>
                    <div className="message-text">
                        <Link to={`${link}`}>
                        {textLink}
                        </Link>
                        {t(message)}
                    </div>
                    
                </div>
            </div>
        )
    }
}


  export default translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      toFriend: (user, sender) => {
        dispatch({ type: ACTION_FROM_SERVER.TO_FRIEND, payload: user, sender });
      },
      toOutgoing: (user, sender) => {
        dispatch({ type: ACTION_FROM_SERVER.TO_OUTGOING, payload: user, sender });
      },
      toIncoming: (user, sender) => {
        dispatch({ type: ACTION_FROM_SERVER.TO_INCOMIG, payload: user, sender });
      },
      toNoFriend: (user, sender) => {
        dispatch({ type: ACTION_FROM_SERVER.TO_NO_FRIEND, payload: user, sender });
      },
      onNewPublication: (publication) => {
        dispatch({ type: ACTION_FOR_APP.ON_ADD_PUBLICATION, payload: publication });
      }
  })
)(MessageQueue));