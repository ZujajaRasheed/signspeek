# nlp_models.py
import os
from dotenv import load_dotenv
from google import genai  # latest google-genai package

# Load API key from .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

# Initialize Gemini client
client = genai.Client(api_key=API_KEY)
MODEL_ID = "gemini-2.0-flash"  # latest Gemini model

def english_model(raw_sentence: str) -> str:
    """Convert sign language glosses into natural English"""
    if not raw_sentence.strip():
        return ""
    prompt = f"Convert these sign language glosses into a natural English sentence: {raw_sentence}"
    try:
        response = client.models.generate_content(model=MODEL_ID, contents=prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini API error (English):", e)
        return raw_sentence  # fallback

def urdu_model(raw_sentence: str) -> str:
    """Convert sign language glosses into natural Urdu"""
    if not raw_sentence.strip():
        return ""
    prompt = f"Convert these sign language glosses into a natural Urdu sentence: {raw_sentence}"
    try:
        response = client.models.generate_content(model=MODEL_ID, contents=prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini API error (Urdu):", e)
        return raw_sentence  # fallback
