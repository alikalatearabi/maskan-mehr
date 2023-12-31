import React, { Fragment, useContext, useEffect } from 'react';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import start_conversion from '../../../assets/images/start-conversion.jpg';

const ChatMessage = () => {
  const { allMemberss, chatss, selectedUserr, currentUserr, fetchChatMemberAsyn, fetchChatAsyn, } = useContext(ChatAppContext);
  useEffect(() => {
    fetchChatMemberAsyn();
    fetchChatAsyn();
    
  }, [allMemberss.length === 0, chatss.length === 0]);

  const selectedChat =
    allMemberss && chatss && selectedUserr
      ? chatss.find(
        (x) =>
          x.users.includes(currentUserr.id) &&
          x.users.includes(selectedUserr.id)
      )
      : null;
  
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr.id;
  var images = require.context('../../../assets/images', true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  return (
    <Fragment>
      {allMemberss && chatss && selectedUserr ?
        <div className="chat-history chat-msg-box custom-scrollbar">
          {selectedChat && selectedChat.messages.length > 0 ? (
            selectedChat.messages.map((item, index) => {
              const participators = allMemberss.find(
                (x) => x.id === item.sender
              );
              return (
                <UL attrUL={{ className: 'simple-list' }} key={index}>
                  <LI attrLI={{ className: 'clearfix' }}>
                    <div className={`message my-message ${item.sender !== currentUserr.id
                      ? '' : 'pull-right other-message'}`}>
                      <Image attrImage={{
                        src: `${dynamicImage(participators.thumb)}`
                        , className: `rounded-circle ${item.sender !== currentUserr.id
                          ? 'float-start ' : 'float-end '}chat-user-img img-30`, alt: ''
                      }} />
                      < div className="message-data text-end">
                        <span className="message-data-time">
                          {item.time}
                        </span>
                      </div>
                      {item.text}
                    </div>
                  </LI>
                </UL>
              );
            })
          ) : (
            <Image attrImage={{
              className: 'img-fluid',
              src: `${start_conversion}`,
              alt: 'start conversion '
            }} />
          )}

        </div>
        : (<div className="loading"></div>)
      }
    </Fragment >
  );
};
export default ChatMessage;