import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  VStack,
  Flex,
  Stack,
  Select,
} from "@chakra-ui/react";
import Navigation from "../HeaderPage/Navigation";

const DailyBudget = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(); // รายได้ต่อเดือน
  const [fixedExpenses, setFixedExpenses] = useState([]); // ค่าใช้จ่ายคงที่
  const [daysInMonth, setDaysInMonth] = useState(30); // จำนวนวัน
  const [savingsPercent, setSavingsPercent] = useState(); // เปอร์เซ็นต์เงินออม
  const [currency, setCurrency] = useState("LAK"); // สกุลเงินเริ่ม
  const [exchange, setExchange] = useState(); // สกุลเงินเริ่ม
  const [budgetResult, setBudgetResult] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("budgetData"));
    if (savedData) {
      setMonthlyIncome(savedData.monthlyIncome || "");
      setFixedExpenses(savedData.fixedExpenses || []);
      setSavingsPercent(savedData.savingsPercent || "");
      setDaysInMonth(savedData.daysInMonth || "");
      setExchange(savedData.exchange || "");
      setCurrency(savedData.currency || "LAK");
    }
  }, []);
  // บันทึกข้อมูลลง Local Storage
  const saveToLocalStorage = () => {
    const data = {
      monthlyIncome,
      fixedExpenses,
      savingsPercent,
      currency,
      daysInMonth,
      exchange,
    };
    localStorage.setItem("budgetData", JSON.stringify(data));
  };

  const addExpense = () => {
    setFixedExpenses([...fixedExpenses, { fixedExpenses: 0 }]);
  };

  const updateFix = (index, name, value) => {
    const newFix = [...fixedExpenses];
    newFix[index][name] = Number(value);
    setFixedExpenses(newFix);
  };
  const calculateBudget = () => {
    const income = Number(monthlyIncome) || 0;
    const totalFixedExpenses = fixedExpenses.reduce(
      (sum, item) => sum + (Number(item.fixedExpenses) || 0),
      0
    );
    const days = Number(daysInMonth) || 30;
    const savePercent = Number(savingsPercent) || 0;

    const savingsAmount = income * (savePercent / 100); // เงินออม
    const usableIncome = income - totalFixedExpenses - savingsAmount; // เงินเหลือใช้
    const dailyBudget = days > 0 ? usableIncome / days : 0; // งบประจำวัน
    const exchangerate = dailyBudget * exchange;
    setBudgetResult({
      usableIncome: usableIncome.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      dailyBudget: dailyBudget.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      savingsAmount: savingsAmount.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      exchangerated: exchangerate.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });
    saveToLocalStorage();
  };
  const deletefix = (index) => {
    const newFixedExpenses = fixedExpenses.filter((item, i) => i !== index);
    setFixedExpenses(newFixedExpenses);
  };
  const currencySymbol = {
    LAK: "ກີບ",
    THB: "฿",
    USD: "$",
  };
  return (
    <Box p={4} bg="gray.100" color="gray.600" minH="100vh" textAlign="center">
      <Navigation />
      <Text fontSize="2xl" mb={4}>
        ຄຳນວນງົບປະຈຳມື້
      </Text>
      <VStack spacing={4} align="center" maxW="600px" mx="auto">
        <FormControl>
          <FormLabel>ລາຍຮັບຕໍ່ເດືອນ (ກີບ)</FormLabel>
          <Flex>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="ລາຍຮັບຕໍ່ເດືອນ"
              bg="white"
            />
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              bg="white"
              w="150px"
            >
              <option value="LAK">ກີບ (LAK)</option>
              <option value="THB">ບາດ (THB)</option>
              <option value="USD">ໂດລາ (USD)</option>
            </Select>
          </Flex>
        </FormControl>
        {currency === "THB" && "USD" && (
            <FormControl>
              <FormLabel>ອັດຕາແລກປ່ຽນ</FormLabel>
              <Input
                type="number"
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                placeholder="ອັດຕາແລກປ່ຽນ"
                bg="white"
              />
            </FormControl>
          )}
           {currency === "USD" && (
            <FormControl>
              <FormLabel>ອັດຕາແລກປ່ຽນ</FormLabel>
              <Input
                type="number"
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                placeholder="ອັດຕາແລກປ່ຽນ"
                bg="white"
              />
            </FormControl>
          )}
        <FormControl>
          <FormLabel>
            ຄ່າໃຊ້ຈ່າຍຄົງທີ່ (ຄ່າໄຟ , ຄ່ານໍ້າ,ຄ່າເຊົ່າຫ້ອງ,ຄ່າເດີນທາງ)
          </FormLabel>
          {fixedExpenses.map((i, index) => (
            <Flex>
              <Input
                key={index}
                type="number"
                name="fixedExpenses"
                onChange={(e) =>
                  updateFix(index, "fixedExpenses", e.target.value)
                }
                placeholder="ຄ່າໃຊ້ຈ່າຍຄົງທີ່ (ຕົວຢ່າງ: ຄ່າເຊົ່າ)"
                bg="white"
              />
              <Button colorScheme="red" onClick={() => deletefix(index)}>
                ລົບ
              </Button>
            </Flex>
          ))}
          <Box paddingTop={"10px"}>
            <Button colorScheme="red" onClick={addExpense}>
              ເພີ່ມຄ່າໃຊ້ຈ່າຍຄົງທີ່
            </Button>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>ຈຳນວນມື້ໃນເດືອນ</FormLabel>
          <Input
            type="number"
            value={daysInMonth}
            onChange={(e) => setDaysInMonth(e.target.value)}
            placeholder="ຈຳນວນມື້ (ປົກກະຕິ 30)"
            bg="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>ເປົ້າໝາຍເງິນອອມ (%)</FormLabel>
          <Input
            type="number"
            value={savingsPercent}
            onChange={(e) => setSavingsPercent(e.target.value)}
            placeholder="ເປົ້າໝາຍເງິນອອມ (ຕົວຢ່າງ: 10)"
            bg="white"
          />
        </FormControl>
        <Button colorScheme="yellow" onClick={calculateBudget}>
          ຄຳນວນ
        </Button>
      </VStack>

      {budgetResult && (
        <Box
          bg="white"
          color="gray.600"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          mt={8}
          maxW="600px"
          mx="auto"
          p={6}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={6}
            textAlign="center"
            color="teal.600"
          >
            ຜົນການຄຳນວນງົບປະຈຳມື້
          </Text>
          <Stack spacing={3}>
            <Flex justify="space-between">
              <Text>ລາຍຮັບຕໍ່ເດືອນ:</Text>
              <Text>
                {Number(monthlyIncome).toLocaleString("lo-LA")}{" "}
                {currencySymbol[currency]}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text>ເງິນອອມ:</Text>
              <Text>
                {budgetResult.savingsAmount} {currencySymbol[currency]}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text>ເງິນເຫຼືອໃຊ້:</Text>
              <Text>
                {budgetResult.usableIncome} {currencySymbol[currency]}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text>ງົບປະຈຳມື້:</Text>
              <Text fontWeight="bold" color="blue.500">
                {budgetResult.dailyBudget} {currencySymbol[currency]}/ມື້
              </Text>
            </Flex>
            <Text fontWeight="bold" color="">
              ຕີເປັນກີບງົບປະຈຳມື້:{budgetResult.exchangerated} ກີບ
            </Text>
          </Stack>
          <Text mt={4} fontSize="sm" color="gray.500">
            ຄຳແນະນຳ: ຄວນອອມຢ່າງໜ້ອຍ 10% ຂອງລາຍຮັບ
          </Text>
        </Box>
      )}

      {/* โฆษณา */}
      <Box mt={6} p={4} bg="gray.100" borderRadius="md" textAlign="center">
        <Text>ໂຄສະນາ: ບໍລິການທະນາຄານຈາກ BCEL - ສະດວກ ວ່ອງໄວ!</Text>
      </Box>
    </Box>
  );
};

export default DailyBudget;
