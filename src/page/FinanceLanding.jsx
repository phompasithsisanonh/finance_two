// import React from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Grid,
//   Heading,
//   HStack,
//   Image,
//   Input,
//   Link,
//   Text,
//   VStack,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import Navigation from '../HeaderPage/Navigation';
// const FeatureCard = ({ title, description, imageUrl }) => {
//   return (
//     <Box 
//       borderWidth="1px" 
//       borderRadius="lg" 
//       overflow="hidden" 
//       p={4}
//       mb={6}
//       bg="white"
//     >
//       <Image src={imageUrl || "/api/placeholder/240/160"} alt={title} mb={4} />
//       <Heading as="h3" size="md" mb={2}>
//         {title}
//       </Heading>
//       <Text color="gray.600" mb={3}>
//         {description}
//       </Text>
//       <Button colorScheme="purple" size="sm">
//         Learn More
//       </Button>
//     </Box>
//   );
// };

// const Testimonial = ({ name, company, quote }) => {
//   return (
//     <Box textAlign="center" px={2}>
//       <Text fontSize="sm" fontWeight="medium">
//         {name}
//       </Text>
//       <Text fontSize="xs" color="gray.500">
//         {company}
//       </Text>
//     </Box>
//   );
// };

// const FooterLink = ({ children }) => {
//   return (
//     <Link 
//       color="gray.600" 
//       fontSize="sm" 
//       _hover={{ color: "purple.500" }}
//     >
//       {children}
//     </Link>
//   );
// };

// const FinanceLanding= () => {
//   const bgColor = useColorModeValue("gray.50", "gray.900");
  
//   return (
//     <Box bg={bgColor} minH="100vh">
//       {/* Navigation */}
//       <Navigation/>

//       {/* Hero Section */}
//       <Box 
//         bgImage="url('/api/placeholder/1200/600')"
//         bgPosition="center"
//         bgSize="cover"
//         py={20}
//         position="relative"
//       >
//         <Box 
//           position="absolute" 
//           top={0} 
//           left={0} 
//           w="100%" 
//           h="100%" 
//           bg="blackAlpha.600"
//         />
//         <Container maxW="container.lg" position="relative">
//           <VStack spacing={6} align="center" textAlign="center">
//             <Heading as="h1" size="2xl" color="white">
//               Master Your Finances
//             </Heading>
//             <Text color="white" fontSize="xl" maxW="container.md">
//               Powerful calculators and tools to help you make smarter financial decisions
//             </Text>
//             <Button colorScheme="purple" size="lg">
//               Get Started
//             </Button>
//           </VStack>
//         </Container>
//       </Box>

//       {/* Feature Cards */}
//       <Container maxW="container.lg" py={16}>
//         <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
//           <FeatureCard 
//             title="Personal Loan Calculator" 
//             description="Plan your loan payments and see the impact of interest rates on your monthly payments."
//           />
//           <FeatureCard 
//             title="Optimize with Credit Cards" 
//             description="Compare different credit cards and find which one suits your spending habits."
//           />
//           <FeatureCard 
//             title="Investment Portfolio Analysis" 
//             description="Track and analyze your investments to maximize returns and minimize risks."
//           />
//         </Grid>
//       </Container>

//       {/* Testimonials */}
//       <Box bg="white" py={12}>
//         <Container maxW="container.lg">
//           <Flex justify="space-between" wrap="wrap">
//             <Testimonial 
//               name="Sarah J." 
//               company="Financial Advisor" 
//               quote="This tool has transformed how I advise my clients."
//             />
//             <Testimonial 
//               name="Mike T." 
//               company="Small Business Owner" 
//               quote="Simplified my business finances tremendously."
//             />
//             <Testimonial 
//               name="Ashley P." 
//               company="Freelancer" 
//               quote="Finally I understand where my money is going!"
//             />
//           </Flex>
//         </Container>
//       </Box>

//       {/* Newsletter */}
//       <Box py={12}>
//         <Container maxW="container.md" textAlign="center">
//           <VStack spacing={4}>
//             <Heading as="h3" size="md">
//               Subscribe to our newsletter
//             </Heading>
//             <Flex maxW="md" w="full" mx="auto">
//               <Input placeholder="Your email" mr={2} />
//               <Button colorScheme="purple">Submit</Button>
//             </Flex>
//           </VStack>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box bg="white" pt={10} pb={4}>
//         <Container maxW="container.lg">
//           <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={8} mb={8}>
//             <Box>
//               <Heading as="h4" size="sm" mb={4}>Company</Heading>
//               <VStack align="start" spacing={2}>
//                 <FooterLink>About</FooterLink>
//                 <FooterLink>Careers</FooterLink>
//                 <FooterLink>Contact</FooterLink>
//               </VStack>
//             </Box>
//             <Box>
//               <Heading as="h4" size="sm" mb={4}>Products</Heading>
//               <VStack align="start" spacing={2}>
//                 <FooterLink>Calculators</FooterLink>
//                 <FooterLink>Tools</FooterLink>
//                 <FooterLink>Plans</FooterLink>
//               </VStack>
//             </Box>
//             <Box>
//               <Heading as="h4" size="sm" mb={4}>Resources</Heading>
//               <VStack align="start" spacing={2}>
//                 <FooterLink>Blog</FooterLink>
//                 <FooterLink>Guides</FooterLink>
//                 <FooterLink>Help Center</FooterLink>
//               </VStack>
//             </Box>
//             <Box>
//               <Heading as="h4" size="sm" mb={4}>Legal</Heading>
//               <VStack align="start" spacing={2}>
//                 <FooterLink>Privacy</FooterLink>
//                 <FooterLink>Terms</FooterLink>
//                 <FooterLink>Cookies</FooterLink>
//               </VStack>
//             </Box>
//             <Box>
//               <Heading as="h4" size="sm" mb={4}>Connect</Heading>
//               <VStack align="start" spacing={2}>
//                 <FooterLink>Twitter</FooterLink>
//                 <FooterLink>LinkedIn</FooterLink>
//                 <FooterLink>Facebook</FooterLink>
//               </VStack>
//             </Box>
//           </Grid>
          
          
//           <Flex justify="space-between" align="center" wrap="wrap">
//             <Box>
//               <Text fontSize="sm" color="gray.500">© 2025 FinanceCalc. All rights reserved.</Text>
//             </Box>
//             <HStack spacing={4}>
//               <Link fontSize="sm" color="gray.500">Privacy</Link>
//               <Link fontSize="sm" color="gray.500">Terms</Link>
//               <Link fontSize="sm" color="gray.500">Sitemap</Link>
//             </HStack>
//           </Flex>
//         </Container>
//       </Box>
//     </Box>
//   );
// };



// export default FinanceLanding;