import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// เชื่อมต่อกับ backend
const socket = io('http://localhost:8080', { transports: ['websocket'] });

function Chat() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [isJoined, setIsJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [historyWith, setHistoryWith] = useState('');

  // เมื่อเชื่อมต่อ Socket.IO
  useEffect(() => {
    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    socket.on('message', ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });

    socket.on('chatHistory', (history) => {
      setMessages(history);
    });

    return () => {
      socket.off('userList');
      socket.off('message');
      socket.off('chatHistory');
    };
  }, []);

  // เข้าร่วมแชท
  const handleJoin = () => {
    if (name && role) {
      socket.emit('join', { role, name });
      setIsJoined(true);
    }
  };

  // ส่งข้อความ
  const handleSendMessage = () => {
    if (to && message) {
      socket.emit('chatMessage', { to, message });
      setMessage('');
    }
  };

  // ดึงประวัติแชท
  const handleGetHistory = () => {
    if (historyWith) {
      socket.emit('getChatHistory', { withUser: historyWith });
    }
  };

  return (
    <div className="App">
      {!isJoined ? (
        <div className="join-container">
          <h1>เข้าร่วมแชท</h1>
          <input
            type="text"
            placeholder="ชื่อของคุณ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="buyer">ลูกค้า (Buyer)</option>
            <option value="seller">ผู้ขาย (Seller)</option>
          </select>
          <button onClick={handleJoin}>เข้าร่วม</button>
        </div>
      ) : (
        <div className="chat-container">
          <h1>แชทเรียลไทม์ - {name} ({role})</h1>

          <div className="user-list">
            <h3>รายชื่อผู้ใช้</h3>
            {users.map((user) => (
              <p key={user.name}>
                {user.name} ({user.role})
              </p>
            ))}
          </div>

          <div className="chat-box">
            <h3>แชท</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.from}:</strong> {msg.message}
                </p>
              ))}
            </div>
            <input
              type="text"
              placeholder="ชื่อคนที่ต้องการคุย"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="พิมพ์ข้อความ"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>ส่ง</button>
          </div>

          <div className="history">
            <h3>ดูประวัติแชท</h3>
            <input
              type="text"
              placeholder="ชื่อคนที่ต้องการดูประวัติ"
              value={historyWith}
              onChange={(e) => setHistoryWith(e.target.value)}
            />
            <button onClick={handleGetHistory}>ดู</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;