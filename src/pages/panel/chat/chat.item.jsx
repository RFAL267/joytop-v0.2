import { Avatar, Badge } from "antd";
import { formatLastMessageTime } from "../../../utils/format.date";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

const ChatItem = ({ chat, onSelect, isActive }) => {
  const { avatar, name, lastMessage, lastMessageTime, unreadCount } = chat;
  const buttonRef = useRef(null);

  const trimmedMessage =
    lastMessage.length > 20 ? `${lastMessage.slice(0, 20)}...` : lastMessage;

  // 🔽 Убираем автофокус при активации
  useEffect(() => {
    if (isActive && buttonRef.current) {
      buttonRef.current.blur(); // снимает фокус с кнопки, чтобы избежать прокрутки
    }
  }, [isActive]);

  return (
    <button
      ref={buttonRef}
      className={`chat_user ${isActive ? "active" : ""}`}
      onClick={() => onSelect(chat.id)}
    >
      <img src={avatar} alt={name} className="chat_user_img" />
      <div className="chat_user_content">
        <div className="chat_user_top">
          <span className="name">{name}</span>
          <small className="last_message_date">
            {formatLastMessageTime(lastMessageTime)}
          </small>
        </div>
        <div className="chat_user_down">
          <span className="chat_last_message">{trimmedMessage}</span>
          {unreadCount > 0 && <Badge count={unreadCount} size="small" />}
        </div>
      </div>
    </button>
  );
};

ChatItem.propTypes = {
  chat: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default ChatItem;
