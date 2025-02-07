import { useState } from 'react'
import { ChakraProvider, Container, VStack, Heading, Text } from '@chakra-ui/react'
import QuestionSection from './components/QuestionSection'
import TrainingPlan from './components/TrainingPlan'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [trainingPlan, setTrainingPlan] = useState(null)
  const [feedback, setFeedback] = useState('')

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Heading>Training Assistant</Heading>
          <QuestionSection
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setFeedback={setFeedback}
          />
          {feedback && (
            <VStack p={4} bg="green.50" borderRadius="md" w="full">
              <Heading size="md">Feedback</Heading>
              <Text>{feedback}</Text>
            </VStack>
          )}
          <TrainingPlan
            trainingPlan={trainingPlan}
            setTrainingPlan={setTrainingPlan}
          />
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
