import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";

import { FiCalendar, FiDollarSign, FiPlusCircle, FiTag, FiTrendingDown, FiTrendingUp, FiTrash2 } from "react-icons/fi";
import Navigation from "../HeaderPage/Navigation";

const Income = () => {
  // State for record management
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("LAK");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  // State for filtering
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Categories with icons
  const categories = {
    income: [
      { id: "salary", name: "ເງິນເດືອນ", icon: "💼" },
      { id: "business", name: "ທຸລະກິດ", icon: "🏢" },
      { id: "investment", name: "ການລົງທຶນ", icon: "📈" },
      { id: "other_income", name: "ອື່ນໆ", icon: "💰" },
    ],
    expense: [
      { id: "food", name: "ອາຫານ", icon: "🍔" },
      { id: "rent", name: "ຄ່າເຊົ່າ", icon: "🏠" },
      { id: "transport", name: "ຄ່າເດີນທາງ", icon: "🚗" },
      { id: "utilities", name: "ຄ່າໄຟຟ້າ", icon: "💡" },
      { id: "entertainment", name: "ຄວາມບັນເທີງ", icon: "🎬" },
      { id: "shopping", name: "ຊື້ເຄື່ອງ", icon: "🛍️" },
      { id: "healthcare", name: "ສຸຂະພາບ", icon: "🏥" },
      { id: "other_expense", name: "ອື່ນໆ", icon: "📝" },
    ],
  };

  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Load data from Local Storage
  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("budgetRecords")) || [];
    setRecords(savedRecords);
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errors.amount = "ກະລຸນາໃສ່ຈຳນວນເງິນທີ່ຖືກຕ້ອງ";
    }
    if (!category) {
      errors.category = "ກະລຸນາເລືອກໝວດໝູ່";
    }
    if (!date) {
      errors.date = "ກະລຸນາເລືອກວັນທີ";
    }
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  };

  // Save record
  const saveRecord = () => {
    if (!validateForm()) return;
    const newRecord = {
      id: Date.now().toString(),
      amount: Number(amount),
      type,
      category,
      currency,
      date,
      description,
      timestamp: new Date().toISOString(),
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("budgetRecords", JSON.stringify(updatedRecords));
    setAmount("");
    setCategory("");
    setDescription("");
    toast({
      title: "ບັນທຶກສຳເລັດ",
      description: `${type === "income" ? "ລາຍຮັບ" : "ຄ່າໃຊ້ຈ່າຍ"} ຈຳນວນ ${Number(amount).toLocaleString("lo-LA")} ${currency} ໄດ້ຖືກບັນທຶກແລ້ວ`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Delete record
  const deleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem("budgetRecords", JSON.stringify(updatedRecords));
    toast({
      title: "ລຶບສຳເລັດ",
      description: "ລາຍການໄດ້ຖືກລຶບແລ້ວ",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Filter and sort records
  const getFilteredRecords = () => {
    return records
      .filter((r) => {
        if (filterType !== "all" && r.type !== filterType) return false;
        if (filterCategory !== "all" && r.category !== filterCategory) return false;
        if (filterStartDate && filterEndDate) {
          const recordDate = new Date(r.date);
          const startDate = new Date(filterStartDate);
          const endDate = new Date(filterEndDate);
          endDate.setHours(23, 59, 59);
          return recordDate >= startDate && recordDate <= endDate;
        }
        if (filterDate) {
          const recordDate = new Date(r.date);
          const filter = new Date(filterDate);
          return (
            recordDate.getDate() === filter.getDate() &&
            recordDate.getMonth() === filter.getMonth() &&
            recordDate.getFullYear() === filter.getFullYear()
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return sortDirection === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        } else if (sortBy === "amount") {
          return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
        }
        return 0;
      });
  };

  const filteredRecords = getFilteredRecords();

  // Calculate statistics by currency
  const currencies = ["LAK", "THB", "USD"];
  const incomeByCurrency = currencies.map((curr) => ({
    currency: curr,
    total: filteredRecords
      .filter((r) => r.type === "income" && r.currency === curr)
      .reduce((sum, r) => sum + r.amount, 0),
  }));
  const expenseByCurrency = currencies.map((curr) => ({
    currency: curr,
    total: filteredRecords
      .filter((r) => r.type === "expense" && r.currency === curr)
      .reduce((sum, r) => sum + r.amount, 0),
  }));
  const balanceByCurrency = currencies.map((curr) => ({
    currency: curr,
    balance:
      incomeByCurrency.find((i) => i.currency === curr)?.total || 0 -
      expenseByCurrency.find((e) => e.currency === curr)?.total || 0,
  }));

  // Currency symbols
  const currencySymbols = { LAK: "ກີບ", THB: "฿", USD: "$" };

  // Data for pie charts by currency
  const incomePieData = incomeByCurrency
    .filter((d) => d.total > 0)
    .map((d) => ({
      name: `${d.currency}`,
      value: d.total,
      color: { LAK: "#38A169", THB: "#3182CE", USD: "#805AD5" }[d.currency],
    }));
  const expensePieData = expenseByCurrency
    .filter((d) => d.total > 0)
    .map((d) => ({
      name: `${d.currency}`,
      value: d.total,
      color: { LAK: "#E53E3E", THB: "#DD6B20", USD: "#D69E2E" }[d.currency],
    }));

  // Data for bar chart by day and currency
  const barData = filteredRecords
    .reduce((acc, r) => {
      const day = new Date(r.date).getDate();
      const key = `${day}-${r.currency}`;
      const existing = acc.find((d) => d.key === key) || {
        day,
        currency: r.currency,
        key,
        income: 0,
        expense: 0,
      };
      if (r.type === "income") existing.income += r.amount;
      else existing.expense += r.amount;
      return acc.some((d) => d.key === key) ? acc : [...acc, existing];
    }, [])
    .sort((a, b) => a.day - b.day);

  // Category breakdown for pie chart
  const getCategoryData = (type) => {
    return filteredRecords
      .filter((r) => r.type === type)
      .reduce((acc, record) => {
        const categoryKey = `${record.category} (${record.currency})`;
        const existing = acc.find((item) => item.name === categoryKey);
        if (existing) {
          existing.value += record.amount;
        } else {
          acc.push({ name: categoryKey, value: record.amount });
        }
        return acc;
      }, []);
  };

  const incomeCategoryData = getCategoryData("income");
  const expenseCategoryData = getCategoryData("expense");

  const categoryColors = {
    "ເງິນເດືອນ (LAK)": "#38A169",
    "ເງິນເດືອນ (THB)": "#3182CE",
    "ເງິນເດືອນ (USD)": "#805AD5",
    "ທຸລະກິດ (LAK)": "#38A169",
    "ທຸລະກິດ (THB)": "#3182CE",
    "ທຸລະກິດ (USD)": "#805AD5",
    "ການລົງທຶນ (LAK)": "#38A169",
    "ການລົງທຶນ (THB)": "#3182CE",
    "ການລົງທຶນ (USD)": "#805AD5",
    "ອື່ນໆ (LAK)": "#718096",
    "ອື່ນໆ (THB)": "#718096",
    "ອື່ນໆ (USD)": "#718096",
    "ອາຫານ (LAK)": "#E53E3E",
    "ອາຫານ (THB)": "#DD6B20",
    "ອາຫານ (USD)": "#D69E2E",
    "ຄ່າເຊົ່າ (LAK)": "#E53E3E",
    "ຄ່າເຊົ່າ (THB)": "#DD6B20",
    "ຄ່າເຊົ່າ (USD)": "#D69E2E",
    "ຄ່າເດີນທາງ (LAK)": "#E53E3E",
    "ຄ່າເດີນທາງ (THB)": "#DD6B20",
    "ຄ່າເດີນທາງ (USD)": "#D69E2E",
    "ຄ່າໄຟຟ້າ (LAK)": "#38B2AC",
    "ຄ່າໄຟຟ້າ (THB)": "#00B5D8",
    "ຄ່າໄຟຟ້າ (USD)": "#9F7AEA",
    "ຄວາມບັນເທີງ (LAK)": "#E53E3E",
    "ຄວາມບັນເທີງ (THB)": "#DD6B20",
    "ຄວາມບັນເທີງ (USD)": "#D69E2E",
    "ຊື້ເຄື່ອງ (LAK)": "#E53E3E",
    "ຊື້ເຄື່ອງ (THB)": "#DD6B20",
    "ຊື້ເຄື່ອງ (USD)": "#D69E2E",
    "ສຸຂະພາບ (LAK)": "#F687B3",
    "ສຸຂະພາບ (THB)": "#F687B3",
    "ສຸຂະພາບ (USD)": "#F687B3",
  };

  // Custom styling for calendar
  const calendarTileClassName = ({ date, view }) => {
    if (view !== "month") return null;
    const dayRecords = records.filter(
      (r) => new Date(r.date).toDateString() === date.toDateString()
    );
    if (dayRecords.length === 0) return null;
    const hasExpense = dayRecords.some((r) => r.type === "expense");
    const hasIncome = dayRecords.some((r) => r.type === "income");
    if (hasExpense && hasIncome) return "has-both";
    if (hasExpense) return "has-expense";
    if (hasIncome) return "has-income";
    return null;
  };

  return (
    <Container maxW="container.xl" py={6}>
        <Navigation/>
      <Text as="h1" mb={6} textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
        ເຄື່ອງມືຈັດການການເງິນ
      </Text>

      <Tabs variant="soft-rounded" colorScheme="teal" isLazy>
        <TabList mb={4} overflowX="auto" py={2}>
          <Tab><Icon as={FiPlusCircle} mr={2} />ບັນທຶກ</Tab>
          <Tab><Icon as={FiTrendingUp} mr={2} />ລາຍງານ</Tab>
          <Tab><Icon as={FiCalendar} mr={2} />ປະຕິທິນ</Tab>
        </TabList>

        <TabPanels>
          {/* Tab 1: Record Entry */}
          <TabPanel>
            <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <Text size="md">{type === "income" ? "ບັນທຶກລາຍຮັບ" : "ບັນທຶກຄ່າໃຊ້ຈ່າຍ"}</Text>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <Flex gap={4} flexWrap="wrap">
                    <Button
                      colorScheme={type === "income" ? "green" : "gray"}
                      flexGrow={1}
                      leftIcon={<FiTrendingUp />}
                      onClick={() => setType("income")}
                    >
                      ລາຍຮັບ
                    </Button>
                    <Button
                      colorScheme={type === "expense" ? "red" : "gray"}
                      flexGrow={1}
                      leftIcon={<FiTrendingDown />}
                      onClick={() => setType("expense")}
                    >
                      ຄ່າໃຊ້ຈ່າຍ
                    </Button>
                  </Flex>

                  <FormControl isRequired isInvalid={formErrors.amount}>
                    <FormLabel>ຈຳນວນເງິນ</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiDollarSign} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                      />
                      <InputRightElement width="4.5rem">
                        <Select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          size="sm"
                          variant="filled"
                          borderLeftRadius={0}
                          width="4.5rem"
                        >
                          <option value="LAK">ກີບ</option>
                          <option value="THB">฿</option>
                          <option value="USD">$</option>
                        </Select>
                      </InputRightElement>
                    </InputGroup>
                    {formErrors.amount && <FormErrorMessage>{formErrors.amount}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired isInvalid={formErrors.category}>
                    <FormLabel>ໝວດໝູ່</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiTag} color="gray.500" />
                      </InputLeftElement>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="ເລືອກໝວດໝູ່"
                      >
                        {categories[type].map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </Select>
                    </InputGroup>
                    {formErrors.category && <FormErrorMessage>{formErrors.category}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired isInvalid={formErrors.date}>
                    <FormLabel>ວັນທີ</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiCalendar} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </InputGroup>
                    {formErrors.date && <FormErrorMessage>{formErrors.date}</FormErrorMessage>}
                  </FormControl>

                  <FormControl>
                    <FormLabel>ລາຍລະອຽດ (ທາງເລືອກ)</FormLabel>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="ລາຍລະອຽດເພີ່ມເຕີມ"
                    />
                  </FormControl>

                  <Button
                    colorScheme={type === "income" ? "green" : "red"}
                    size="lg"
                    onClick={saveRecord}
                    mt={2}
                  >
                    ບັນທຶກ
                  </Button>
                </Stack>
              </CardBody>
            </Card>

            {records.length > 0 && (
              <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor} mt={4}>
                <CardHeader>
                  <Text size="md">ທຸລະກຳຫຼ້າສຸດ</Text>
                </CardHeader>
                <CardBody>
                  <Stack spacing={3}>
                    {records
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 5)
                      .map((record) => (
                        <Flex
                          key={record.id || record.timestamp}
                          justify="space-between"
                          align="center"
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={borderColor}
                        >
                          <Flex align="center">
                            <Tag
                              size="md"
                              colorScheme={record.type === "income" ? "green" : "red"}
                              borderRadius="full"
                              mr={3}
                            >
                              <TagLabel>
                                {record.type === "income"
                                  ? categories.income.find((c) => c.name === record.category)?.icon || "💰"
                                  : categories.expense.find((c) => c.name === record.category)?.icon || "📝"}
                              </TagLabel>
                            </Tag>
                            <Box>
                              <Text fontWeight="bold">{record.category}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {new Date(record.date).toLocaleDateString("lo-LA")}
                                {record.description && ` - ${record.description}`}
                              </Text>
                            </Box>
                          </Flex>
                          <Flex align="center" gap={2}>
                            <Text
                              fontWeight="bold"
                              color={record.type === "income" ? "green.500" : "red.500"}
                            >
                              {record.type === "income" ? "+" : "-"}
                              {record.amount.toLocaleString("lo-LA")} {currencySymbols[record.currency]}
                            </Text>
                            <IconButton
                              aria-label="Delete record"
                              icon={<FiTrash2 />}
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => deleteRecord(record.id)}
                            />
                          </Flex>
                        </Flex>
                      ))}
                  </Stack>
                </CardBody>
              </Card>
            )}
          </TabPanel>

          {/* Tab 2: Reports */}
          <TabPanel>
            <Stack spacing={6}>
              <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <CardHeader pb={0}>
                  <Text  size="md">ຕົວກອງແລະຈັດລຳດັບ</Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>ປະເພດທຸລະກຳ</FormLabel>
                        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                          <option value="all">ທັງໝົດ</option>
                          <option value="income">ລາຍຮັບ</option>
                          <option value="expense">ຄ່າໃຊ້ຈ່າຍ</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>ໝວດໝູ່</FormLabel>
                        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                          <option value="all">ທຸກໝວດໝູ່</option>
                          {(filterType === "all" || filterType === "income") &&
                            categories.income.map((cat) => (
                              <option key={`inc-${cat.id}`} value={cat.name}>
                                {cat.icon} {cat.name}
                              </option>
                            ))}
                          {(filterType === "all" || filterType === "expense") &&
                            categories.expense.map((cat) => (
                              <option key={`exp-${cat.id}`} value={cat.name}>
                                {cat.icon} {cat.name}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>ຈັດລຳດັບຕາມ</FormLabel>
                        <Flex gap={2}>
                          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">ວັນທີ</option>
                            <option value="amount">ຈຳນວນ</option>
                          </Select>
                          <IconButton
                            aria-label="Toggle sort direction"
                            icon={sortDirection === "asc" ? <FiTrendingUp /> : <FiTrendingDown />}
                            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                          />
                        </Flex>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3 }}>
                      <FormControl>
                        <FormLabel>ຊ່ວງວັນທີ</FormLabel>
                        <Flex gap={2} flexWrap={{ base: "wrap", md: "nowrap" }}>
                          <Input
                            type="date"
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                            placeholder="ເລີ່ມຈາກ"
                          />
                          <Text alignSelf="center">ຫາ</Text>
                          <Input
                            type="date"
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                            placeholder="ເຖິງ"
                          />
                          <Button
                            colorScheme="gray"
                            onClick={() => {
                              setFilterStartDate("");
                              setFilterEndDate("");
                              setFilterDate("");
                            }}
                          >
                            ລ້າງ
                          </Button>
                        </Flex>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>

              <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <CardHeader pb={0}>
                  <Text size="md">ສະຫຼຸບລວມແຍກຕາມສະກຸນເງິນ</Text>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    {currencies.map((curr) => (
                      <StatGroup key={curr}>
                        <Stat>
                          <StatLabel>{curr} - ລາຍຮັບ</StatLabel>
                          <StatNumber color="green.500">
                            {incomeByCurrency
                              .find((i) => i.currency === curr)
                              ?.total.toLocaleString("lo-LA") || 0}{" "}
                            {currencySymbols[curr]}
                          </StatNumber>
                          <StatHelpText>
                            {filteredRecords.filter((r) => r.type === "income" && r.currency === curr).length} ລາຍການ
                          </StatHelpText>
                        </Stat>
                        <Stat>
                          <StatLabel>{curr} - ຄ່າໃຊ້ຈ່າຍ</StatLabel>
                          <StatNumber color="red.500">
                            {expenseByCurrency
                              .find((e) => e.currency === curr)
                              ?.total.toLocaleString("lo-LA") || 0}{" "}
                            {currencySymbols[curr]}
                          </StatNumber>
                          <StatHelpText>
                            {filteredRecords.filter((r) => r.type === "expense" && r.currency === curr).length} ລາຍການ
                          </StatHelpText>
                        </Stat>
                        <Stat>
                          <StatLabel>{curr} - ຍອດດຸນ</StatLabel>
                          <StatNumber color={balanceByCurrency.find((b) => b.currency === curr)?.balance >= 0 ? "green.500" : "red.500"}>
                            {balanceByCurrency.find((b) => b.currency === curr)?.balance.toLocaleString("lo-LA") || 0}{" "}
                            {currencySymbols[curr]}
                          </StatNumber>
                          <StatHelpText>
                            <StatArrow
                              type={balanceByCurrency.find((b) => b.currency === curr)?.balance >= 0 ? "increase" : "decrease"}
                            />
                            {Math.abs(
                              (balanceByCurrency.find((b) => b.currency === curr)?.balance || 0) /
                                (expenseByCurrency.find((e) => e.currency === curr)?.total || 1) * 100
                            ).toFixed(1)}% {balanceByCurrency.find((b) => b.currency === curr)?.balance >= 0 ? " ເຫຼືອ" : " ຂາດດຸນ"}
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    ))}
                  </Stack>
                </CardBody>
              </Card>

              <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Text size="md">ລາຍຮັບແຍກຕາມສະກຸນເງິນ</Text>
                  </CardHeader>
                  <CardBody>
                    {incomePieData.length > 0 ? (
                      <Box height="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={incomePieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {incomePieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => value.toLocaleString("lo-LA")} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">ບໍ່ມີຂໍ້ມູນເພື່ອສະແດງ</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>

                <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Text size="md">ຄ່າໃຊ້ຈ່າຍແຍກຕາມສະກຸນເງິນ</Text>
                  </CardHeader>
                  <CardBody>
                    {expensePieData.length > 0 ? (
                      <Box height="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expensePieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {expensePieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => value.toLocaleString("lo-LA")} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">ບໍ່ມີຂໍ້ມູນເພື່ອສະແດງ</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>

                <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md">ສົມທຽບຕາມວັນແລະສະກຸນເງິນ</Heading>
                  </CardHeader>
                  <CardBody>
                    {barData.length > 0 ? (
                      <Box height="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <RechartsTooltip
                              formatter={(value, name, props) =>
                                `${value.toLocaleString("lo-LA")} ${currencySymbols[props.payload.currency]}`
                              }
                            />
                            <Legend />
                            <Bar name="ລາຍຮັບ" dataKey="income" fill="#38A169" />
                            <Bar name="ຄ່າໃຊ້ຈ່າຍ" dataKey="expense" fill="#E53E3E" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">ບໍ່ມີຂໍ້ມູນເພື່ອສະແດງ</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>

                <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md">ໝວດໝູ່ລາຍຮັບ</Heading>
                  </CardHeader>
                  <CardBody>
                    {incomeCategoryData.length > 0 ? (
                      <Box height="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={incomeCategoryData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {incomeCategoryData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={categoryColors[entry.name] || "#718096"}
                                />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => value.toLocaleString("lo-LA")} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">ບໍ່ມີຂໍ້ມູນເພື່ອສະແດງ</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>

                <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md">ໝວດໝູ່ຄ່າໃຊ້ຈ່າຍ</Heading>
                  </CardHeader>
                  <CardBody>
                    {expenseCategoryData.length > 0 ? (
                      <Box height="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expenseCategoryData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {expenseCategoryData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={categoryColors[entry.name] || "#718096"}
                                />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => value.toLocaleString("lo-LA")} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    ) : (
                      <Box height="300px" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">ບໍ່ມີຂໍ້ມູນເພື່ອສະແດງ</Text>
                      </Box>
                    )}
                  </CardBody>
                </Card>
              </Grid>
            </Stack>
          </TabPanel>

          {/* Tab 3: Calendar */}
          <TabPanel>
            <Card bg={cardBg} boxShadow="md" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
              <CardHeader pb={0}>
                <Heading size="md">ປະຕິທິນການເງິນ</Heading>
              </CardHeader>
              <CardBody>
                <Calendar
                  onChange={(value) => setFilterDate(value.toISOString().split("T")[0])}
                  value={filterDate ? new Date(filterDate) : new Date()}
                  tileClassName={calendarTileClassName}
                />
                {filterDate && (
                  <Box mt={4}>
                    <Text fontWeight="bold" mb={2}>
                      ລາຍການວັນທີ {new Date(filterDate).toLocaleDateString("lo-LA")}:
                    </Text>
                    <Stack spacing={3}>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((r) => (
                          <Flex
                            key={r.id}
                            justify="space-between"
                            align="center"
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            borderColor={borderColor}
                          >
                            <Flex align="center">
                              <Tag
                                size="md"
                                colorScheme={r.type === "income" ? "green" : "red"}
                                borderRadius="full"
                                mr={3}
                              >
                                <TagLabel>
                                  {r.type === "income"
                                    ? categories.income.find((c) => c.name === r.category)?.icon || "💰"
                                    : categories.expense.find((c) => c.name === r.category)?.icon || "📝"}
                                </TagLabel>
                              </Tag>
                              <Box>
                                <Text fontWeight="bold">{r.category}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {r.description || "ບໍ່ມີລາຍລະອຽດ"}
                                </Text>
                              </Box>
                            </Flex>
                            <Text
                              fontWeight="bold"
                              color={r.type === "income" ? "green.500" : "red.500"}
                            >
                              {r.type === "income" ? "+" : "-"}
                              {r.amount.toLocaleString("lo-LA")} {currencySymbols[r.currency]}
                            </Text>
                          </Flex>
                        ))
                      ) : (
                        <Text color="gray.500">ບໍ່ມີລາຍການໃນມື້ນີ້</Text>
                      )}
                    </Stack>
                  </Box>
                )}
              </CardBody>
            </Card>
            <style jsx>{`
              .has-income {
                background-color: #e6ffe6;
              }
              .has-expense {
                background-color: #ffe6e6;
              }
              .has-both {
                background-color: #fff3e6;
              }
            `}</style>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Income;