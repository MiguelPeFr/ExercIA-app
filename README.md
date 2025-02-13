# ExercIA - Training Assistant Application

## Description
ExercIA is an interactive training assistant application that helps users by generating personalized training plans and providing a dynamic question-answer system with real-time feedback. The application combines modern UI design with intelligent AI-powered training assistance to create an engaging fitness experience.

## Main Features
- **Dynamic Question Generation**: Automatically generates relevant fitness assessment questions
- **Real-time Feedback**: Provides immediate feedback on user responses
- **Personalized Training Plans**: Generates customized 4-week training plans
- **Modern UI/UX**: Built with Chakra UI for a clean and responsive interface
- **AI-Powered**: Utilizes Google's Gemini AI for intelligent interactions

## Technical Requirements
### Frontend
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Backend
- Python 3.7 or higher
- FastAPI
- Google Generative AI library
- Valid Google API key for Gemini AI

## Installation and Setup
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   pip install fastapi uvicorn google-generativeai
   ```
4. Configure the Google API key in `app.py`
5. Start the backend server:
   ```bash
   python app.py
   ```
6. Start the frontend development server:
   ```bash
   npm run dev
   ```
7. Access the application at `http://localhost:5173`

## Technical Architecture

### Frontend Architecture
- **Component Structure**:
  - `App.jsx`: Main application component and routing
  - `QuestionSection.jsx`: Handles fitness assessment questions and user responses
  - `TrainingPlan.jsx`: Manages training plan generation and display
  - Utilizes Chakra UI for consistent styling and responsive design

### Backend Architecture
- **FastAPI Framework**:
  - High-performance, modern Python web framework
  - Built-in request validation and error handling

- **Gemini AI Integration**:
  - Uses Google's Generative AI for intelligent responses
  - Configured with specific parameters for optimal output
  - Handles markdown and JSON formatting

### API Endpoints
- **GET `/generar_pregunta`**:
  - Generates fitness assessment questions
  - Returns JSON-formatted questions in Spanish
  - Includes question ID and text

- **POST `/procesar_respuesta`**:
  - Processes user responses to questions
  - Provides personalized feedback
  - Stores responses for training plan generation

- **GET `/generar_entrenamiento`**:
  - Generates personalized 4-week training plans
  - Based on stored user responses
  - Includes exercises, sets, reps, and progression strategy

## Technologies Used

### Frontend
- React 18.2
- Vite 5.1 (Build tool)
- Chakra UI 2.8.2 (Component library)
- Axios (HTTP client)
- React Markdown (Markdown rendering)

### Backend
- FastAPI (Web framework)
- Uvicorn (ASGI server)
- Google Generative AI (Gemini model)
- Pydantic (Data validation)

### Development Tools
- ESLint (Code linting)
- @vitejs/plugin-react (Vite React plugin)
- Various React development plugins

## Scripts
### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Backend
- `python app.py`: Start the FastAPI server

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
