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

const LoanMoneyfloating = () => {
  const [type, setType] = useState(""); // ประเภท (บ้าน/รถ/ที่ดิน)
  const [principal, setPrincipal] = useState(0); // เงินต้น
  const [interestRate, setInterestRate] = useState(0); // ดอกเบี้ยต่อปี (%)
  const [years, setYears] = useState(0); // จำนวนปี
  const [monthlyData, setMonthlyData] = useState([]); // ข้อมูลรายเดือน

  console.log(monthlyData);

  const calculateLoan = () => {
    const interestrate_month = interestRate / 100 / 12; //ດອກເບ້ຍຕໍ່ເດືອນ
    const n = years * 12; ///ຈຳນວນງວດ
    let balance = principal;
    let data = [];
    const principal_pay = balance / n; // เงินต้นที่จ่าย
    for (let i = 1; i <= n; i++) {
      const interest_pay = balance * interestrate_month; // ดอกเบี้ยที่ต้องจ่าย
      balance -= principal_pay; // ลดเงินต้นที่เหลือ
      const emi= interest_pay+principal_pay
      data.push({
        month: i,
        interest: interest_pay.toFixed(2),
        principal: principal_pay.toFixed(2),
        balance: balance.toFixed(2),
        emi:emi.toFixed(2)
      });
      setMonthlyData(data);
    }
  };
  return (
    <div>
      <Navigation />
      <Box p={4} bg="gray.100" color="gray.600" minH="100vh" textAlign="center">
        <Text fontSize="2xl" mb={4}>
          ຄຳນວນເງິນກູ້ແບບຫູຸດຕົ້ນຫຼຸດດອກ
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
          <Box mt={8} maxW="auto" mx="auto">
            <Text fontSize="xl" mb={4}>
              ຜົນການຄຳນວນ
            </Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontFamily={'Noto Sans Lao, serif'}>ເດືອນ</Th>
                    <Th fontFamily={'Noto Sans Lao, serif'}>ຕົ້ນທືນ</Th>
                    <Th fontFamily={'Noto Sans Lao, serif'}>ດອກເບ້ຍ (ບາດ)</Th>
                    <Th fontFamily={'Noto Sans Lao, serif'}>ເງິນຕົ້ນຕ້ອງຈ່າຍ (ບາດ)</Th>
                    <Th fontFamily={'Noto Sans Lao, serif'}>ຍອດລວມດອກເບ້ຍ+ຕົ້ນທືນຕ້ອງຈ່າຍ (ບາດ)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {monthlyData.map((data) => (
                    <Tr key={data.month}>
                      <Td>{data.month}</Td>
                      <Td>{data.balance.toLocaleString()}</Td>
                      <Td>{data.interest.toLocaleString()}</Td>
                      <Td>{data.principal.toLocaleString()}</Td>
                      <Td>{data.emi.toLocaleString()}</Td>
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
  );
};

export default LoanMoneyfloating;
