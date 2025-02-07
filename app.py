from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Gen AI
GOOGLE_API_KEY = ""  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

# Create the model
generation_config = {
  "temperature": 0.7,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 60000,
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-thinking-exp-01-21",
  generation_config=generation_config,
)
# Store user responses
user_responses = []

class Response(BaseModel):
    pregunta: str
    respuesta: str

@app.get("/generar_pregunta")
async def generar_pregunta():
    prompt = """
    Generate 3 important questions to understand a person's fitness goals and current condition. 
    Format the response as a JSON array of objects, where each object has:
    - id: a number
    - pregunta: the question in Spanish
    
    The questions should cover:
    1. Current fitness level and exercise routine
    2. Specific fitness goals
    3. Any health conditions or limitations

    Example:
    [
        {"id": 1, "pregunta": "¿Cuál es tu rutina actual de ejercicio y nivel de condición física?"}, 
        {"id": 2, "pregunta": "¿Cuáles son tus objetivos específicos de entrenamiento?"}, 
        {"id": 3, "pregunta": "¿Tienes alguna condición de salud o limitación física que debamos considerar?"}
    ]
    """
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Remove any markdown formatting if present
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
            
        # Clean and parse the JSON
        response_text = response_text.strip()
        import json
        try:
            questions = json.loads(response_text)
            return {"pregunta": {"pregunta": questions}}
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid response format from AI model")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/procesar_respuesta")
async def procesar_respuesta(response: Response):
    # Store the response
    user_responses.append({
        "pregunta": response.pregunta,
        "respuesta": response.respuesta
    })
    
    # Generate feedback based on the response
    prompt = f"""
    Analyze this fitness-related response and provide constructive feedback in Spanish:
    Question: {response.pregunta}
    Answer: {response.respuesta}
    """
    
    try:
        feedback = model.generate_content(prompt)
        return {"retroalimentacion": feedback.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/generar_entrenamiento")
async def generar_entrenamiento():
    if not user_responses:
        raise HTTPException(status_code=400, detail="No hay respuestas almacenadas")
    
    # Create a comprehensive prompt with all user responses
    responses_text = "\n".join(
        [f"Pregunta: {r['pregunta']}\nRespuesta: {r['respuesta']}" for r in user_responses]
    )
    
    prompt = f"""
    Based on the following user responses, create a personalized 4-week training plan in Spanish.
    Include specific exercises, sets, reps, and rest periods.
    
    USER RESPONSES:
    {responses_text}
    
    Format the plan to include:
    1. Weekly breakdown
    2. Daily exercises
    3. Progression strategy
    4. Recovery recommendations
    """
    
    try:
        plan = model.generate_content(prompt)
        return {"plan": plan.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
