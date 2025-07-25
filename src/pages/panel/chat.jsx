import "../../css/panel/panel.chat.css";
import PanelLayout from "../../components/panel/panel.layout";
import ChatSidebar from "../panel/chat/chat.sidebar";
import ChatViewport from "../panel/chat/chat.viewport";
import userImg from "../../assets/img/profile.png";
import { useState, useEffect } from "react";

// Мок чатов
const mockChats = [
  {
    id: "1",
    name: "Алиса",
    avatar: userImg,
    lastMessage: "Привет! Как дела? Давно не виделись!",
    lastMessageTime: "2025-07-19T16:00:00Z",
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Боб",
    avatar: userImg,
    lastMessage: "Хорошо, спасибо :)",
    lastMessageTime: "2025-07-18T12:00:00Z",
    unreadCount: 0,
  },
];

// Мок сообщений по чатам
const mockMessages = {
  "1": [
    { id: 1, text: "Привет!", isSelf: false },
    { id: 2, text: "Как дела?", isSelf: false },
    { id: 3, text: "Отлично, спасибо. А ты как?", isSelf: true },
  ],
  "2": [
    { id: 1, text: "Йо!", isSelf: false },
    { id: 2, text: "Здорово, что ты тут.", isSelf: true },
  ],
};

const PanelChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Имитация загрузки чатов
  useEffect(() => {
    setChats(mockChats);
  }, []);

  // Загрузка сообщений при выборе чата
  useEffect(() => {
    if (selectedChatId) {
      setLoading(true);

      // Имитируем асинхронную загрузку
      setTimeout(() => {
        setMessages(mockMessages[selectedChatId] || []);
        setLoading(false);
      }, 300);
    }
  }, [selectedChatId]);

  const handleChatSelect = (id) => {
    setSelectedChatId(id);
  };

  const handleSendMessage = (text) => {
    if (!text || !selectedChatId) return;

    const newMessage = {
      id: Date.now(),
      text,
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Можно также обновить lastMessage в списке чатов
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, lastMessage: text, lastMessageTime: new Date().toISOString() }
          : chat
      )
    );
  };

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  return (
    <PanelLayout>
      <section className="panel_page panel_chat">
        <div className="chat_body">
          <ChatSidebar
            chats={chats}
            selectedChatId={selectedChatId}
            onSelect={handleChatSelect}
          />
          <ChatViewport
            selectedChat={selectedChat}
            messages={messages}
            loading={loading}
            onSendMessage={handleSendMessage}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default PanelChat;
