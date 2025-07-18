
import os
from google import genai
from dotenv import load_dotenv
from google.genai import types
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import json
from backend.app import app

#app = Flask(__name__)
#reinclude this line for testing this file independently, would not work with render due to different flask instances

#CORS(app, origins=["http://localhost:5173", "https://orbital-phishermen.netlify.app"]) 
#might have to change localhost port for testing locally

@app.route('/api/llm', methods=['POST'])
def analyze():
    data = request.json
    user_text = data.get('text')
    llm_raw_response = analyse_with_llm(user_text)

    match = re.search(r"```json\s*(\{.*\})\s*```", llm_raw_response, re.DOTALL)
    if match:
        json_str = match.group(1)
        try:
            llm_json = json.loads(json_str)
            return llm_json  # return dict
        except json.JSONDecodeError:
            # fallback: return raw string if parse fails
            return {"response": llm_raw_response}
    else:
        # fallback: return raw string if pattern not found
        return {"response": llm_raw_response}

def analyse_with_llm(text):
    # Example: simulate response
    llm_response = generate(text)
    return llm_response

def generate(input):
    load_dotenv()
    client = genai.Client(
        api_key= os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-2.5-flash-preview-04-17"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"Analyse this text : \n{input}"),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text="""You are a phishing detection assistant. Use your prior knowledge on how official organisations will handle such things and whether it is is likely to be phishing or not based off cross referencing 

Analyze the message below for signs of phishing.

Use the following red flags as guidance:
- Suspicious or shortened links (e.g., tinyurl, bit.ly, non-bank domains)
- Spoofed or misspelled domain names (e.g., m1cr0soft.com.co)
- No https or missing padlock icon in URLs
- Requests for OTPs, bank info, personal or login credentials
- Prompts to download attachments or apps outside official stores
- Claims from banks, IRAS, or delivery companies urging urgent action
-The message may pressure you to act quickly (“Your account will be suspended!”) or make unusual requests, such as confirming sensitive information or making immediate payments
- The sender’s email may look similar to a legitimate company but is slightly altered (e.g., extra characters, misspellings, or using public domains like Gmail instead of a corporate domain)


Respond with:
- Classification: Phishing / Likely Phishing / Not Phishing (Try to be as certain as possible unless really ambiguous)
- Type of scam (Online Shopping, Taxes etc), give one type only and the most suitable one.
- Reasoning (max 2 sentences)
- Advice to the user (short and practical)

Only respond in the following JSON format:
{
  \"title\": \"...\",
  \"classification\": \"...\",
  \"type\": \"...\"
  \"reasoning\": \"...\",
  \"advice\": \"...\"
  \"official_url\": \"...\"
  \"phishing_url\": \"...\"
}
"""),
        ],
    )

    response = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response += chunk.text
    return response

        

## For Testing


