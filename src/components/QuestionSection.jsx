import { useState } from 'react'
import { VStack, Button, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'

function QuestionSection({ currentQuestion, setCurrentQuestion, setFeedback }) {
  const [userResponse, setUserResponse] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const toast = useToast()

  const fetchNewQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generar_pregunta')
      const data = response.data.pregunta.pregunta
      setQuestions(data)
      setQuestionIndex(0)
      setCurrentQuestion(data[0])
      setUserResponse('')
      setFeedback('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch question',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1)
      setCurrentQuestion(questions[questionIndex + 1])
      setUserResponse('')
      setFeedback('')
    }
  }

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide an answer',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      const response = await axios.post('http://localhost:8000/procesar_respuesta', {
        pregunta: currentQuestion.pregunta,
        respuesta: userResponse
      })
      setFeedback(response.data.retroalimentacion)
      // Show next question if available
      if (questionIndex < questions.length - 1) {
        setTimeout(handleNextQuestion, 2000) // Wait 2 seconds before showing next question
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process response',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={4} w="full">
      <Button colorScheme="blue" onClick={fetchNewQuestion}>
        Get New Questions
      </Button>
      {currentQuestion && (
        <VStack spacing={4} w="full" p={6} bg="gray.50" borderRadius="lg" boxShadow="md">
          <Text fontSize="md" color="gray.500">
            Question {questionIndex + 1} of {questions.length}
          </Text>
          <VStack spacing={2} w="full" align="start">
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
              ID: {currentQuestion.id}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.700">
              {currentQuestion.pregunta}
            </Text>
          </VStack>
          <Textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your answer here..."
            size="lg"
            minH="150px"
            p={4}
            bg="white"
            borderColor="blue.200"
            _hover={{ borderColor: 'blue.300' }}
            _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
          />
          <Button 
            colorScheme="green" 
            onClick={handleSubmitResponse}
            size="lg"
            w="full"
            maxW="400px"
          >
            Submit Answer
          </Button>
        </VStack>
      )}
    </VStack>
  )
}

export default QuestionSection