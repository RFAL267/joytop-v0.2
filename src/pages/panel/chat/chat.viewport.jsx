// chat.viewport.jsx
import { Typography, Spin, Input, Button } from "antd";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import userImg from "../../../assets/img/profile.png";

const { Title } = Typography;
const { TextArea } = Input;

const ChatViewport = ({ selectedChat, messages = [], loading = false, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);


  // 
  function handleSendMessage() {
    if (!inputValue.trim()) return;

    onSendMessage?.(inputValue.trim());
    setInputValue("");
  }
  // Автопрокрутка вниз при новых сообщениях
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="chat_viewport empty">
        <Title level={4}>Выберите чат</Title>
      </div>
    );
  }

  return (
    <div className="chat_viewport">
      {/* Заголовок чата */}
      <div className="chat_vheader">
        <div className="chat_user_vprofile">
          <img className="vprofile_img" src={userImg} alt="user" />
          <div className="vprofile_content">
            <p className="name">{selectedChat.name}</p>
            <small className="status">online</small>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="chat_messages">
        <div className="area">
          {loading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : messages.length === 0 ? (
            <div className="no_messages">Нет сообщений</div>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                className={`message ${msg.isSelf ? "self_message" : ""}`}
                key={msg.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {!msg.isSelf && (
                  <div className="message_user">
                    <img src={userImg} alt="user" />
                  </div>
                )}
                <div className="message_card">
                  <div className="message_body">
                    <span className="m_text">{msg.text}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Поле ввода */}
      <div className="chat_input_area">
          <Button
            icon={<PaperClipOutlined />}
            type="text"
            className="attach_btn"
            size="large"
          />
        <TextArea
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите сообщение..."
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          size="large"
        />

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="large"
          />
      </div>
    </div>
  );

  function handleSendMessage() {
    if (!inputValue.trim()) return;

    // Тут можно вызвать props.onSendMessage(inputValue)
    console.log("Отправлено:", inputValue);
    setInputValue("");
  }
};

export default ChatViewport;
