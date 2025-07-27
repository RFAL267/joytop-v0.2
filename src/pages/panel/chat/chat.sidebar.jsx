import ChatItem from "./chat.item";
import PropTypes from "prop-types";
import { Typography, Skeleton } from "antd";

const { Title } = Typography;

const ChatSidebar = ({ chats, selectedChatId, onSelect }) => {
  return (
    <aside className="chat_sidebar">
      <p>Чаты</p>
      <div className="chat_list">
        {chats.length === 0 ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={selectedChatId === chat.id}
              onSelect={() => onSelect(chat.id)} // передаем только id
            />
          ))
        )}
      </div>
    </aside>
  );
};

ChatSidebar.propTypes = {
  chats: PropTypes.array.isRequired,
  selectedChatId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ChatSidebar;
