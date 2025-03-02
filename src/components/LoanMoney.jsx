import React, { useState } from "react";
import Navigation from "../HeaderPage/Navigation";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
const LoanMoney = () => {
  const [type, setType] = useState(""); // ประเภท (บ้าน/รถ/ที่ดิน)
  const [principal, setPrincipal] = useState(0); // เงินต้น
  const [interestRate, setInterestRate] = useState(0); // ดอกเบี้ยต่อปี (%)
  const [years, setYears] = useState(0); // จำนวนปี
  const [monthlyData, setMonthlyData] = useState([]); // ข้อมูลรายเดือน
  //   console.log(Math.pow(2, 3)); // 2^3 = 8
  //   console.log(Math.pow(5, 2)); // 5^2 = 25
  //   console.log(Math.pow(10, -1)); // 10^-1 = 0.1
  //   console.log(Math.pow(4, 0.5)); // 4^0.5 = 2 (เท่ากับ sqrt(4))
  const calculateLoan = () => {
    const monthlyInterestRate = interestRate / 100 / 12; // อัตราดอกเบี้ยรายเดือน
    const numberOfPayments = years * 12; // จำนวนงวด
    const emi =
      (principal *  monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1); // ค่างวด
    let balance = principal; // ยอดคงเหลือ
    const data = []; // ข้อมูลรายเดือน
    for (let i = 1; i <= numberOfPayments; i++) {
      // วนลูปเพื่อคำนวณค่างวดแต่ละงวด
      const interest = balance * monthlyInterestRate; // ดอกเบี้ย
      const principal = emi - interest; // ส่วนต้น
      balance = balance - principal; // ยอดคงเหลือ
      data.push({
        // เก็บข้อมูลรายเดือน
        month: i,
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setMonthlyData(data);
  };
  return (
    <div>
      <Navigation />
      <div>
        <Box
          p={4}
          bg="gray.100"
          color="gray.600"
          minH="100vh"
          textAlign="center"
        >
          <Text fontSize="2xl" mb={4}>
            ຄຳນວນເງິນກູ້ດອກເບ້ຍຄົງທີ່
          </Text>
          <VStack spacing={4} align="center" maxW="600px" mx="auto">
            <FormControl>
              <FormLabel>ປະເພດ</FormLabel>
              <Input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="ປະເພດ (ບ້ານ/ລົດ/ທີ່ດິນ)"
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>ເງິນຕົ້ນ (ບາດ)</FormLabel>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="ເງິນຕົ້ນທີ່ກູ້"
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>ດອກເບ້ຍຕໍ່ປີ (%)</FormLabel>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="ດອກເບ້ຍຕໍ່ປີ"
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>ໄລຍະເວລາກູ້ (ປີ)</FormLabel>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="ປີ"
                bg="white"
              />
            </FormControl>
            <Button colorScheme="yellow" onClick={calculateLoan}>
              ຄຳນວນ
            </Button>
          </VStack>

          {monthlyData.length > 0 && (
            <Box mt={8} maxW="800px" mx="auto">
              <Text fontSize="xl" mb={4}>
                ຜົນການຄຳນວນ (12 ເດືອນທຳອິດ)
              </Text>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ເດືອນ</Th>
                      <Th>ຄ່າງວດ (ບາດ)</Th>
                      <Th>ດອກເບ້ຍ (ບາດ)</Th>
                      <Th>ເງິນຕົ້ນ (ບາດ)</Th>
                      <Th>ຄົງເຫຼືອ (ບາດ)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {monthlyData.map((data) => (
                      <Tr key={data.month}>
                        <Td>{data.month}</Td>
                        <Td>{data.emi}</Td>
                        <Td>{data.interest}</Td>
                        <Td>{data.principal}</Td>
                        <Td>{data.balance}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Box mt={4}>
                <Text>ເງິນກູ້: {principal} ບາດ</Text>
                <Text>
                  ດອກເບ້ຍລວມ:{" "}
                  {monthlyData
                    .reduce((sum, data) => sum + Number(data.interest), 0)
                    .toFixed(2)}{" "}
                  ບາດ
                </Text>
                <Text>
                  ຕົ້ນທຶນລວມ:{" "}
                  {monthlyData
                    .reduce((sum, data) => sum + Number(data.emi), 0)
                    .toFixed(2)}{" "}
                  ບາດ
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default LoanMoney;
