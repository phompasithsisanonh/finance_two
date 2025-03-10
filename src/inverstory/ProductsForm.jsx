import React, { useState } from 'react';
import { 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  useToast 
} from '@chakra-ui/react';
import axios from 'axios';

function ProductsForm() {
  const [barcode, setBarcode] = useState(''); // เพิ่ม state สำหรับ barcode
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // แปลง price และ quantity เป็น number
      const productData = {
        barcode,
        name,
        price: Number(price),
        quantity: Number(quantity),
      };
      await axios.post('http://localhost:8080/api/products', productData); // เปลี่ยนพอร์ตให้ตรงกับ Backend
      toast({
        title: "เพิ่มสินค้าสำเร็จ",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // รีเซ็ตฟอร์ม
      setBarcode('');
      setName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.response?.data?.error || "ไม่สามารถเพิ่มสินค้าได้",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>รหัสบาร์โค้ด</FormLabel>
          <Input 
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="กรอกรหัสบาร์โค้ด"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>ชื่อสินค้า</FormLabel>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="กรอกชื่อสินค้า"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>ราคา</FormLabel>
          <Input 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="กรอกราคาสินค้า"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>จำนวน</FormLabel>
          <Input 
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="กรอกจำนวนสินค้า"
          />
        </FormControl>

        <Button colorScheme="green" type="submit" width="full">
          เพิ่มสินค้า
        </Button>
      </VStack>
    </form>
  );
}

export default ProductsForm;