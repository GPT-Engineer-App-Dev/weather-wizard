import { Container, Text, VStack, Input, Button, Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const fetchWeather = async (location) => {
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`);
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (location) {
      const id = setInterval(() => {
        fetchWeather(location);
      }, 300000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [location]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Weather Forecast</Heading>
        <Input 
          placeholder="Enter location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          size="lg"
        />
        <Button onClick={() => fetchWeather(location)} colorScheme="blue" size="lg">Get Weather</Button>
        {error && <Text color="red.500">{error}</Text>}
        {weather && (
          <Box p={4} borderWidth={1} borderRadius="lg" width="100%" textAlign="center">
            <Heading as="h2" size="lg">{weather.name}</Heading>
            <Text fontSize="2xl">{weather.main.temp}°C</Text>
            <Text fontSize="lg">{weather.weather[0].description}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;