import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  VStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const ProfitSale = () => {
  // State สำหรับวัตถุดิบ
  const [materials, setMaterials] = useState([{ name: "", cost: 0, quantity: 0 }]);
  // State สำหรับการขาย
  const [itemName, setItemName] = useState("");
  const [sellPricePerItem, setSellPricePerItem] = useState(0);
  const [quantityProduced, setQuantityProduced] = useState(0);
  const [quantitySold, setQuantitySold] = useState(0);
  const [extraCost, setExtraCost] = useState(0);
  const [fixedCost, setFixedCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [targetProfitPercent, setTargetProfitPercent] = useState(0); // เปอร์เซ็นต์กำไรที่ต้องการ
  const [profitResult, setProfitResult] = useState(null);
  const [remainingItems, setRemainingItems] = useState(0); // ของที่เหลือจากวันก่อน

  // เพิ่มวัตถุดิบใหม่
  const addMaterial = () => {
    setMaterials([...materials, { name: "", cost: 0, quantity: 0 }]);
  };

  // อัปเดตข้อมูลวัตถุดิบ
  const updateMaterial = (index, field, value) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = field === "cost" || field === "quantity" ? Number(value) : value;
    setMaterials(newMaterials);
  };

  // คำนวณกำไร
  const calculateProfit = () => {
    // คำนวณต้นทุนวัตถุดิบทั้งหมด
    const materialCost = materials.reduce((sum, mat) => sum + mat.cost * mat.quantity, 0);
    const totalCostPerItem = materialCost / quantityProduced || 0; // ต้นทุนต่อชิ้นจากวัตถุดิบ

    const cost = totalCostPerItem; // ต้นทุนต่อชิ้น
    const sellPrice = Number(sellPricePerItem);
    const produced = Number(quantityProduced);
    const sold = Number(quantitySold);
    const extra = Number(extraCost);
    const fixed = Number(fixedCost);
    const disc = Number(discount);
    const taxFee = Number(tax);

  
  };

  return (
    <Box p={4} bg="gray.100" color="gray.600" minH="100vh" textAlign="center">
      <Text fontSize="2xl" mb={4}>
        ຄຳນວນກຳໄລຈາກການຂາຍ
      </Text>
      <VStack spacing={4} align="center" maxW="600px" mx="auto">
        {/* วัตถุดิบ */}
        <Box w="100%">
          <Text fontSize="lg" mb={2}>
            ວັດຖຸດິບ
          </Text>
          {materials.map((material, index) => (
            <VStack key={index} spacing={2} mb={4} align="start">
              <FormControl>
                <FormLabel>ຊື່ວັດຖຸດິບ</FormLabel>
                <Input
                  type="text"
                  value={material.name}
                  onChange={(e) => updateMaterial(index, "name", e.target.value)}
                  placeholder="ຊື່ວັດຖຸດິບ (ຕົວຢ່າງ: ໄກ່)"
                  bg="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel>ລາຄາຕໍ່ຫົວໜ່ວຍ (ບາດ)</FormLabel>
                <Input
                  type="number"
                  value={material.cost}
                  onChange={(e) => updateMaterial(index, "cost", e.target.value)}
                  placeholder="ລາຄາຕໍ່ຫົວໜ່ວຍ"
                  bg="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel>ຈຳນວນ</FormLabel>
                <Input
                  type="number"
                  value={material.quantity}
                  onChange={(e) => updateMaterial(index, "quantity", e.target.value)}
                  placeholder="ຈຳນວນ (ຕົວຢ່າງ: 10)"
                  bg="white"
                />
              </FormControl>
            </VStack>
          ))}
          <Button colorScheme="teal" onClick={addMaterial}>
            ເພີ່ມວັດຖຸດິບ
          </Button>
        </Box>

        {/* การขาย */}
        <FormControl>
          <FormLabel>ຊື່ສິນຄ້າ</FormLabel>
          <Input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="ຊື່ສິນຄ້າ (ຕົວຢ່າງ: ເຂົ້າໜຽວໄກ່ຍ່າງ)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ລາຄາຂາຍຕໍ່ຊິ້ນ (ບາດ)</FormLabel>
          <Input
            type="number"
            value={sellPricePerItem}
            onChange={(e) => setSellPricePerItem(e.target.value)}
            placeholder="ລາຄາຂາຍຕໍ່ຊິ້ນ"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ຈຳນວນທີ່ຜະລິດ (ຊິ້ນ)</FormLabel>
          <Input
            type="number"
            value={quantityProduced}
            onChange={(e) => setQuantityProduced(e.target.value)}
            placeholder="ຈຳນວນທີ່ຜະລິດ"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ຈຳນວນທີ່ຂາຍ (ຊິ້ນ)</FormLabel>
          <Input
            type="number"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            placeholder="ຈຳນວນທີ່ຂາຍ"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ຄ່າໃຊ້ຈ່າຍເພີ່ມ (ບາດ)</FormLabel>
          <Input
            type="number"
            value={extraCost}
            onChange={(e) => setExtraCost(e.target.value)}
            placeholder="ຄ່າໃຊ້ຈ່າຍເພີ່ມ (ຕົວຢ່າງ: ຄ່າຂົນສົ່ງ)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ຕົ້ນທຶນຄົງທີ່ (ບາດ)</FormLabel>
          <Input
            type="number"
            value={fixedCost}
            onChange={(e) => setFixedCost(e.target.value)}
            placeholder="ຕົ້ນທຶນຄົງທີ່ (ຕົວຢ່າງ: ຄ່າເຊົ່າ)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ສ່ວນຫຼຸດ (ບາດ)</FormLabel>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="ສ່ວນຫຼຸດ (ຖ້າມີ)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ພາສີ/ຄ່າທຳນຽມ (ບາດ)</FormLabel>
          <Input
            type="number"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            placeholder="ພາສີຫຼືຄ່າທຳນຽມ (ຖ້າມີ)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ເປົ້າໝາຍກຳໄລ (%)</FormLabel>
          <Input
            type="number"
            value={targetProfitPercent}
            onChange={(e) => setTargetProfitPercent(e.target.value)}
            placeholder="ເປົ້າໝາຍກຳໄລ (ຕົວຢ່າງ: 20)"
            bg="white"
          />
        </FormControl>
        <Button colorScheme="yellow" onClick={calculateProfit}>
          ຄຳນວນ
        </Button>
      </VStack>

      {profitResult && (
        <Box mt={8} maxW="800px" mx="auto">
          <Text fontSize="xl" mb={4}>
            ຜົນການຄຳນວນກຳໄລ
          </Text>
          <Text>ສິນຄ້າ: {itemName}</Text>
          <Text>ຕົ້ນທຶນຜັນແປລວມ: {profitResult.totalVariableCost} ບາດ</Text>
          <Text>ຕົ້ນທຶນລວມ: {profitResult.totalCost} ບາດ</Text>
          <Text>ລາຍຮັບລວມ: {profitResult.totalRevenue} ບາດ</Text>
          <Text>ກຳໄລຂັ້ນຕົ້ນ: {profitResult.grossProfit} ບາດ</Text>
          <Text>ກຳໄລສຸດທິ: {profitResult.netProfit} ບາດ</Text>
          <Text>ເປົ້າໝາຍກຳໄລ ({targetProfitPercent}%): {profitResult.targetProfit} ບາດ</Text>
          <Text>ຕ້ອງຂາຍຕໍ່ຊິ້ນທີ່: {profitResult.requiredSellPrice} ບາດ</Text>
          <Text>ຕ້ອງຂາຍ: {profitResult.requiredQuantity} ຊິ້ນ</Text>
          <Text>ຂາຍต่อມື້ເພື່ອຄືນທຶນ: {profitResult.dailyBreakEven} ຊິ້ນ</Text>
          <Text>ສິນຄ້າເຫຼືອ: {profitResult.remainingItems} ຊິ້ນ (ມູນຄ່າ: {profitResult.remainingValue} ບາດ)</Text>
        </Box>
      )}

      {/* ตารางของเหลือสำหรับวันถัดไป */}
      {remainingItems > 0 && (
        <Box mt={8} maxW="800px" mx="auto">
          <Text fontSize="xl" mb={4}>
            ສິນຄ້າທີ່ເຫຼືອສຳລັບມື້ຖັດໄປ
          </Text>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ຊື່ສິນຄ້າ</Th>
                  <Th>ຈຳນວນເຫຼືອ (ຊິ້ນ)</Th>
                  <Th>ມູນຄ່າ (ບາດ)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{itemName}</Td>
                  <Td>{remainingItems}</Td>
                  <Td>{(remainingItems *0).toFixed(2)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ProfitSale;