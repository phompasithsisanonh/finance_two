import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinPage({ socket, setUser }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name && role) {
      socket.emit('join', { role, name });
      setUser({ name, role });
      navigate(role === 'buyer' ? '/buyer' : '/seller');
    }
  };

  return (
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
  );
}

export default JoinPage;