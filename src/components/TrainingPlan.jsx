import { VStack, Button, Text, useToast, Heading } from '@chakra-ui/react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function TrainingPlan({ trainingPlan, setTrainingPlan }) {
  const toast = useToast()

  const fetchTrainingPlan = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generar_entrenamiento')
      setTrainingPlan(response.data.plan)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch training plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={4} w="full">
      <Button colorScheme="purple" onClick={fetchTrainingPlan} size="lg">
        Generate Training Plan
      </Button>
      {trainingPlan && (
        <VStack spacing={4} w="full" p={6} bg="purple.50" borderRadius="lg" boxShadow="md">
          <Heading size="md" color="purple.700">Your Personalized Training Plan</Heading>
          <VStack w="full" align="start">
            <ReactMarkdown className="markdown-content">
              {trainingPlan}
            </ReactMarkdown>
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}

export default TrainingPlan