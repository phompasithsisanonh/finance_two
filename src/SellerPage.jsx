import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellerPage({ socket, user }) {
  const [users, setUsers] = useState([]);
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [historyWith, setHistoryWith] = useState('');
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    socket.on('userList', (userList) => {
      setUsers(userList.filter((u) => u.role === 'buyer'));
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
    fetchProducts(); // ดึงสินค้าทันทีที่เข้ามา
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

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/products', {
        barcode,
        name,
        price: Number(price),
        quantity: Number(quantity),
      });
      alert('เพิ่มสินค้าสำเร็จ: ' + response.data.data.name);
      setBarcode('');
      setName('');
      setPrice('');
      setQuantity('');
      const productsResponse = await axios.get('http://localhost:8080/api/products');
      setProducts(productsResponse.data.data); // อัปเดตสินค้าหลังเพิ่ม
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.response.data.message);
    }
  };

  return (
    <div className="chat-container">
      <h1>หน้า Seller - {user.name}</h1>
      <div className="user-list">
        <h3>รายชื่อ Buyer</h3>
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
          placeholder="ชื่อ Buyer ที่ต้องการคุย"
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
          placeholder="ชื่อ Buyer"
          value={historyWith}
          onChange={(e) => setHistoryWith(e.target.value)}
        />
        <button onClick={handleGetHistory}>ดู</button>
      </div>
      <div className="product-management">
        <h3>เพิ่มสินค้า</h3>
        <input
          type="text"
          placeholder="บาร์โค้ด"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <input
          type="text"
          placeholder="ชื่อสินค้า"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="ราคา"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="จำนวน"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddProduct}>เพิ่มสินค้า</button>
        <h4>รายการสินค้า</h4>
        <ul>
          {products.map((product) => (
            <li key={product.barcode}>
              {product.name} - ฿{product.price} (คงเหลือ: {product.quantity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SellerPage;