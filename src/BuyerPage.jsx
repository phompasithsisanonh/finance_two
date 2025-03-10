import React, { useState, useEffect } from 'react';

function BuyerPage({ socket, user }) {
  const [users, setUsers] = useState([]);
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [historyWith, setHistoryWith] = useState('');

  useEffect(() => {
    socket.on('userList', (userList) => {
      setUsers(userList.filter((u) => u.role === 'seller'));
    });
    socket.on('message', ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });
    socket.on('chatHistory', (history) => {
      setMessages(history.map((msg) => ({ from: msg.from, message: msg.message })));
    });
    socket.on('error', ({ message }) => {
      alert('Error: ' + message);
    });
    return () => {
      socket.off('userList');
      socket.off('message');
      socket.off('chatHistory');
      socket.off('error');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (to && message) {
      socket.emit('chatMessage', { to, message });
      setMessage('');
    }
  };

  const handleGetHistory = () => {
    if (historyWith) {
      socket.emit('getChatHistory', { withUser: historyWith });
    }
  };

  return (
    <div className="chat-container">
      <h1>หน้า Buyer - {user.name}</h1>
      <div className="user-list">
        <h3>รายชื่อ Seller</h3>
        {users.map((u) => (
          <p key={u.name}>{u.name}</p>
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
          placeholder="ชื่อ Seller ที่ต้องการคุย"
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
          placeholder="ชื่อ Seller"
          value={historyWith}
          onChange={(e) => setHistoryWith(e.target.value)}
        />
        <button onClick={handleGetHistory}>ดู</button>
      </div>
    </div>
  );
}

export default BuyerPage;