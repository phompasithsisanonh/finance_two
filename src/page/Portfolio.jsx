import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Avatar,
  Badge,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCode,
  FaBars,
} from "react-icons/fa";
import imgs from "./im.jpeg";
import a from "./e-commece Image/a.jpeg";
import f from "./e-commece Image/f.jpeg";
import e from "./e-commece Image/e.jpeg";
import j from "./e-commece Image/j.jpeg";
import o from "./e-commece Image/o.jpeg";
import p from "./e-commece Image/p.jpeg";
import u from "./e-commece Image/u.jpeg";
import ds from "./e-commece Image/ds.jpeg";
import b from "./e-commece Image/b.jpeg";
import d from "./e-commece Image/d.jpeg";
import ss from "./calute/ss.png";
import aa from "./calute/aa.png";
import ccc from "./calute/ccc.png";
import dd from "./calute/dd.png";
import { MdOutlineAccountBox, MdOutlineLanguage } from "react-icons/md";
// Header Component with Mobile Responsiveness
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      width="100%"
      zIndex={10}
      bg={bg}
      boxShadow="sm"
    >
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          <Heading
            as="h1"
            size={{ base: "md", md: "lg" }}
            letterSpacing="tight"
          >
            <Link href="#home" _hover={{ textDecoration: "none" }}>
              YourName
            </Link>
          </Heading>

          {/* Desktop Menu */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                fontSize="sm"
                fontWeight="medium"
                _hover={{ color: "teal.500" }}
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </HStack>

          <HStack>
            <Button onClick={toggleColorMode} variant="ghost" size="md">
              <Icon as={colorMode === "light" ? FaMoon : FaSun} />
            </Button>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              variant="ghost"
              icon={<FaBars />}
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  fontSize="lg"
                  fontWeight="medium"
                  _hover={{ color: "teal.500" }}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

// Hero Section with Responsive Layout
const Hero = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box id="home" bg={bg} pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.xl" py={{ base: 10, md: 20 }}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 8, md: 12 }}
          alignItems="center"
        >
          <VStack
            spacing={6}
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            order={{ base: 2, md: 1 }}
          >
            <Text fontSize={"20px"} color="teal.500" fontWeight="bold">
              Hello, I'm
            </Text>
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              MR. PHOMPASITH SISANONH
            </Heading>
            <Text
              fontSize={"30px"}
              as="h3"
              size={{ base: "md", md: "lg" }}
              color="gray.500"
            >
              ການເງິນ & Full stack developer
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>
              I build responsive web applications with modern technologies.
              Passionate about creating intuitive user experiences.
            </Text>
            <HStack spacing={4}>
              <Button colorScheme="teal" size={{ base: "md", md: "lg" }}>
                View Projects
              </Button>
              <Button variant="outline" size={{ base: "md", md: "lg" }}>
                Resume
              </Button>
            </HStack>
          </VStack>

          <Flex
            justify="center"
            order={{ base: 1, md: 2 }}
            mb={{ base: 4, md: 0 }}
          >
            <Box
              boxSize={{ base: "250px", sm: "300px", md: "350px" }}
              borderRadius="full"
              bg="teal.500"
              overflow="hidden"
              boxShadow="xl"
            >
              {/* Replace with your image */}
              <Image
                src={imgs}
                alt="Your Name"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/500?text=Your+Photo"
              />
            </Box>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

// About Section
const About = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box id="about" bg={bg}>
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          <Heading as="h2" size="xl">
            About Me
          </Heading>

          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={{ base: 8, md: 12 }}
            width="100%"
          >
            <Flex justify="center">
              <Avatar
                size={{ base: "xl", md: "2xl" }}
                src={imgs}
                name="Your Name"
                boxShadow="lg"
                p={1}
                bg="white"
              />
            </Flex>

            <VStack
              spacing={6}
              align={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text fontSize={{ base: "md", md: "lg" }}>
                I'm a frontend developer with a passion for building beautiful,
                responsive, and user-friendly websites. I have experience with
                modern frontend frameworks and libraries like React, along with
                design systems like Chakra UI.
              </Text>

              <Text fontSize={{ base: "md", md: "lg" }}>
                With a background in design and development, I bring a unique
                perspective to projects that balances aesthetics with
                functionality. I'm constantly learning new technologies to stay
                at the forefront of web development.
              </Text>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width="100%">
                <VStack align={{ base: "center", sm: "flex-start" }}>
                  <HStack>
                    <Text fontWeight="bold">Name:</Text>
                    <Text>MR. PHOMPASITH SISANONH</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>phompasit2323@gmail.com</Text>
                  </HStack>
                </VStack>

                <VStack align={{ base: "center", sm: "flex-start" }}>
                  <Text fontWeight="bold">Location:</Text>
                  <HStack>
                    <Text>
                      {" "}
                      Huai hong village ,Chanthaburi District, Vientine Capital
                    </Text>
                  </HStack>
                </VStack>
              </SimpleGrid>

              <Button
                colorScheme="teal"
                leftIcon={<FaEnvelope />}
                alignSelf={{ base: "center", md: "flex-start" }}
              >
                Download CV
              </Button>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

// Projects Section
const Projects = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description:
        "A fully responsive e-commerce platform built with React and Node.js",
      image: f,
      tags: ["React", "Node.js", "MongoDB"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 2,
      title: "Calcuate Website",
      description:
        "ເວັບໄຊຄຳນວນເງິນກູ້ ບັນທືກລາຍ ຮັບຈ່າຍ ແຕ່ຍັງບໍ່ໄດ້ເຊື່ອມຕໍ່ backend Static web",
      image: ss,
      tags: ["React", "Chakra UI"],
      demoLink: "https://calcuate.netlify.app/income",
      codeLink: "#",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "A drag-and-drop task management application with user authentication",
      image: "https://via.placeholder.com/500?text=Task+App",
      tags: ["React", "Firebase", "CSS"],
      demoLink: "#",
      codeLink: "#",
    },
  ];
  const ImageProject = [
    {
      name: "E-Commerce Website",
      Image: [a, b, d, ds, e, f, j, o, p, u],
    },
    {
      name: "Calcuate Website",
      Image: [aa, ccc, dd, ss],
    },
  ];
  const [dataImageProject, setDataImageProject] = useState([]);
  const handleClick = (title) => {
    console.log(title);
    onOpen();
    const filtered = ImageProject.filter((item) => item.name === title);
    setDataImageProject(filtered);
    console.log(filtered);
  };
  console.log(dataImageProject);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box id="projects" bg={bg}>
      <Modal size={"full"} w="100%" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>E-commerce</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {dataImageProject.map((item, index) =>
              item.Image.map((i, index) => (
                <Image
                  key={index}
                  src={i}
                  alt=""
                  h={{ base: "160px", md: "600px" }}
                  w="100%"
                  objectFit="cover"
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          <Heading as="h2" size="xl" textAlign="center">
            My Projects
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
            width="100%"
          >
            {projects.map((project) => (
              <Box
                key={project.id}
                bg={cardBg}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  h={{ base: "160px", md: "200px" }}
                  w="100%"
                  objectFit="cover"
                />

                <Box p={{ base: 4, md: 6 }}>
                  <Heading as="h3" size="md" mb={2}>
                    {project.title}
                  </Heading>

                  <Text mb={4} fontSize={{ base: "sm", md: "md" }}>
                    {project.description}
                  </Text>

                  <HStack mb={4} flexWrap="wrap">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        colorScheme="teal"
                        variant="subtle"
                        mb={1}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                  <HStack spacing={4}>
                    {project.demoLink === "#" ? (
                      <>
                        <Text width={160} color="red">
                          Sorry this website can not deploy if you would like to
                          see please contact me 02096947226
                        </Text>
                      </>
                    ) : (
                      <Button size="sm" colorScheme="teal">
                        <a href={project.demoLink}>Live Demo</a>
                      </Button>
                    )}
                    <Button
                      onClick={() => handleClick(project.title)}
                      size="sm"
                      variant="outline"
                    >
                      View Image
                    </Button>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// Skills Section
const Skills = () => {
  const bg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FaCode,
      skills: [
        {
          Subject: "python",
          percent: 40,
        },
        {
          Subject: "Bootstrap",
          percent: 40,
        },

        {
          Subject: "JavaScript",
          percent: 60,
        },
        {
          Subject: "React",
          percent: 70,
        },
        {
          Subject: "Redux",
          percent: 50,
        },
        {
          Subject: "CharkUI",
          percent: 40,
        },
      ],
    },
    {
      title: "Backend Development",
      icon: FaCode,
      skills: [
        { Subject: "Nodjs", percent: 60 },
        { Subject: "Expressjs", percent: 60 },
        { Subject: "MongoDB", percent: 60 },
      ],
    },
    {
      title: "Finance",
      icon: MdOutlineAccountBox,
      skills: [{ Subject: "accounting", percent: 60 }],
    },
    {
      title: "Language",
      icon: MdOutlineLanguage,
      skills: [
        { Subject: "Chinese-HSK4", percent: 50 },
        { Subject: "English-Beginner", percent: 30 },
        { Subject: "Lao", percent: 100 },
      ],
    },
    {
      title: "Tool",
      icon: MdOutlineLanguage,
      skills: [
        { Subject: "git", percent: 40 },
        { Subject: "github", percent: 40 },
        { Subject: "AI", percent: 50 },
      ],
    },
  ];
  return (
    <Box id="skills" bg={bg}>
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          <Heading as="h2" size="xl" textAlign="center">
            My Skills
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 6, md: 10 }}
            width="100%"
          >
            {skillCategories.map((category, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="lg"
                boxShadow="md"
              >
                <VStack spacing={6}>
                  <Icon as={category.icon} w={10} h={10} color="teal.500" />
                  <Heading as="h3" size="md" textAlign="center">
                    {category.title}
                  </Heading>

                  <VStack spacing={2} width="100%">
                    {category?.skills?.map((skill, index) => (
                      <Box key={index} width="100%">
                        <Flex justify="space-between" mb={2}>
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            {skill.Subject}
                          </Text>
                          <Flex>
                            <Text fontSize={{ base: "sm", md: "md" }}>
                              {skill.percent} %
                            </Text>
                          </Flex>
                        </Flex>
                        <Box
                          w="100%"
                          bg="gray.200"
                          borderRadius="full"
                          h={{ base: "6px", md: "8px" }}
                          overflow="hidden"
                        >
                          <Box
                            w={`${skill.percent}%`}
                            bg="teal.500"
                            h="100%"
                            borderRadius="full"
                          />
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// Contact Section
const Contact = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box id="contact" bg={bg}>
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          <Heading as="h2" size="xl" textAlign="center">
            Get In Touch
          </Heading>

          <Box width="100%" maxW="800px" mx="auto">
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={{ base: 8, md: 8 }}
            >
              <VStack
                spacing={4}
                align={{ base: "center", md: "flex-start" }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading as="h3" size="md">
                  Contact Information
                </Heading>
                <Text>
                  Feel free to contact me for any work or suggestions below
                </Text>

                <VStack
                  spacing={4}
                  align={{ base: "center", md: "flex-start" }}
                  mt={6}
                >
                  <HStack>
                    <Icon as={FaEnvelope} color="teal.500" />
                    <Text>your.email@example.com</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaGithub} color="teal.500" />
                    <Link href="https://github.com/yourusername" isExternal>
                      github.com/yourusername
                    </Link>
                  </HStack>
                  <HStack>
                    <Icon as={FaLinkedin} color="teal.500" />
                    <Link
                      href="https://linkedin.com/in/yourusername"
                      isExternal
                    >
                      linkedin.com/in/yourusername
                    </Link>
                  </HStack>
                </VStack>

                <HStack spacing={4} mt={6}>
                  <Link href="https://github.com/yourusername" isExternal>
                    <Icon as={FaGithub} w={6} h={6} />
                  </Link>
                  <Link href="https://linkedin.com/in/yourusername" isExternal>
                    <Icon as={FaLinkedin} w={6} h={6} />
                  </Link>
                  <Link href="https://twitter.com/yourusername" isExternal>
                    <Icon as={FaTwitter} w={6} h={6} />
                  </Link>
                </HStack>
              </VStack>

              <Box
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="lg"
                boxShadow="lg"
              >
                <VStack spacing={4}>
                  <Heading as="h3" size="md" mb={2}>
                    Send Message
                  </Heading>

                  <Flex direction="column" width="100%">
                    <Input placeholder="Your Name" mb={4} />
                    <Input placeholder="Your Email" mb={4} />
                    <Textarea placeholder="Your Message" rows={5} mb={4} />
                    <Button colorScheme="teal" width="100%">
                      Send Message
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

// Footer Component
const Footer = () => {
  const bg = useColorModeValue("gray.800", "gray.900");

  return (
    <Box bg={bg} color="white" py={{ base: 6, md: 8 }}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize={{ base: "sm", md: "md" }}>
            © {new Date().getFullYear()} Your Name. All rights reserved
          </Text>
          <HStack spacing={4}>
            <Link href="https://github.com/yourusername" isExternal>
              <Icon as={FaGithub} w={5} h={5} />
            </Link>
            <Link href="https://linkedin.com/in/yourusername" isExternal>
              <Icon as={FaLinkedin} w={5} h={5} />
            </Link>
            <Link href="https://twitter.com/yourusername" isExternal>
              <Icon as={FaTwitter} w={5} h={5} />
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

// Input component (missing from Chakra UI import)
const Input = (props) => {
  return (
    <Box
      as="input"
      px={4}
      py={2}
      borderWidth="1px"
      borderRadius="md"
      width="100%"
      _focus={{
        outline: "none",
        borderColor: "teal.500",
        boxShadow: "0 0 0 1px teal.500",
      }}
      {...props}
    />
  );
};

// Textarea component (missing from Chakra UI import)
const Textarea = (props) => {
  return (
    <Box
      as="textarea"
      px={4}
      py={2}
      borderWidth="1px"
      borderRadius="md"
      width="100%"
      _focus={{
        outline: "none",
        borderColor: "teal.500",
        boxShadow: "0 0 0 1px teal.500",
      }}
      {...props}
    />
  );
};

// Main App
const Portfolio = () => {
  return (
    <Box>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </Box>
  );
};

export default Portfolio;
