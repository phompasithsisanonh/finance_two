import React, { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner'; // Default export
import axios from 'axios';

function BarcodeScanner({ onScanSuccess }) {
  const [data, setData] = useState('กำลังสแกน...');
  const [product, setProduct] = useState(null);
  const [stopStream, setStopStream] = useState(false)
  const handleError = (err) => {
    console.error('Scan error:', err);
  };

  const handleScan = async (result, err) => {
    if (result) {
      const barcode = result.text;
      console.log(barcode )
      setData(`สแกนสำเร็จ: ${barcode}`);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${barcode}`);
        setProduct(response.data);
        onScanSuccess(response.data, barcode); // ส่ง product และ barcode
      } catch (error) {
        setProduct(null);
        setData('ไม่พบสินค้าในระบบ');
        onScanSuccess(null, barcode); // ส่ง null และ barcode เมื่อไม่พบ
      }
    }
    if (err && err.name !== 'NotFoundError') {
      handleError(err);
    }
  };

  return (
    <VStack spacing={4}>
       
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result);
          else setData(`Not Found ${result}`);
        }}
        onError={handleError}
      />
      <Box textAlign="center">
        <Text>{data}</Text>
        {product && (
          <VStack spacing={2} mt={4}>
            <Text>ชื่อสินค้า: {product.name}</Text>
            <Text>ราคา: {product.price} บาท</Text>
            <Text>จำนวน: {product.quantity} ชิ้น</Text>
          </VStack>
        )}
      </Box>
    </VStack>
  );
}

export default BarcodeScanner;