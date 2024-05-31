import { Container, Text, VStack, Input, Button, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Weather Forecast</Heading>
        <Input 
          placeholder="Enter city name" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          size="lg"
        />
        <Button onClick={fetchWeather} colorScheme="blue" size="lg">Get Weather</Button>
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