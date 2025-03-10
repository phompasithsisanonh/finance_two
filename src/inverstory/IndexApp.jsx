import React, { useState } from "react";
import {
  ChakraProvider,
  VStack,
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import BarcodeScanner from "./BarcodeScanner";
import ProductForm from "./ProductsForm";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrReader } from "react-qr-reader";

const IndexApp = () => {
  const [scanResult, setScanResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };
  console.log(scanResult);
  const handleError = (err) => {
    console.error(err);
  };
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ChakraProvider>
      <Container maxW="container.md" centerContent>
        <VStack spacing={6} width="100%" mt={10}>
          <Heading>ระบบคงคลังสินค้า</Heading>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            width="100%"
            index={activeTab}
            onChange={(index) => setActiveTab(index)}
          >
            <TabList>
              <Tab>สแกนบาร์โค้ด</Tab>
              <Tab>เพิ่มสินค้าใหม่</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <QrReader
                  onResult={(result, error) => {
                    if (result) {
                      setScanResult(result.text);
                    }
                    if (error) {
                      console.error(error);
                    }
                  }}
                  constraints={{ facingMode: "environment" }}
                  style={{ width: "100%" }}
                />
                {scanResult && <p>ผลลัพธ์: {scanResult}</p>}
              </TabPanel>
              <TabPanel>
                <ProductForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default IndexApp;
