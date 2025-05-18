#!/usr/bin/env python3
"""
War Outcome Predictor with Economic Impact Analysis
"""

import argparse
import joblib
import os
import sys
import requests
from typing import Tuple, Dict, Any
import logging
import json
import numpy as np
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model.pkl')

# API Configuration
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyDP8qZQy7W1E0Fdn66Jowd_el34BhTgXhw")
GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"
GEMINI_MODELS = ["gemini-2.0-flash"]  # Ordered by preference

def test_api_connection() -> Tuple[bool, str]:
    """Test connection to the Gemini API."""
    for model in GEMINI_MODELS:
        api_url = f"{GEMINI_API_BASE}/{model}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{
                "parts": [{
                    "text": "Respond with 'API test successful'"
                }]
            }]
        }
        
        logger.info(f"Testing connection with model: {model}")
        try:
            response = requests.post(api_url, json=payload, timeout=10)
            if response.status_code == 200:
                logger.info(f"✅ Successfully connected to {model}")
                return True, model
            logger.warning(f"Failed to connect to {model}: HTTP {response.status_code}")
        except Exception as e:
            logger.warning(f"Error connecting to {model}: {str(e)}")
    
    logger.error("❌ Failed to connect to any Gemini model")
    return False, ""

def create_dummy_model_if_needed():
    """Create a simple logistic regression model if model file doesn't exist."""
    if not os.path.exists(MODEL_PATH):
        try:
            from sklearn.linear_model import LogisticRegression
            model = LogisticRegression()
            X = np.array([[0.1], [0.3], [0.5], [0.7], [0.9]])
            y = np.array([0, 0, 1, 1, 1])
            model.fit(X, y)
            
            os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
            joblib.dump(model, MODEL_PATH)
            logger.info(f"Created dummy model at {MODEL_PATH}")
        except Exception as e:
            logger.error(f"Failed to create dummy model: {e}")

def load_model() -> Any:
    """Load the trained model with validation."""
    create_dummy_model_if_needed()
    
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    try:
        return joblib.load(MODEL_PATH)
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise

def predict_outcome(troopsA: int, modA: float, troopsB: int, modB: float) -> Tuple[str, float, float]:
    """Predict war outcome using the trained model."""
    if troopsA <= 0 or troopsB <= 0:
        raise ValueError("Troop counts must be positive")
    if modA <= 0 or modB <= 0:
        raise ValueError("Modifiers must be positive")

    strengthA = troopsA * modA
    strengthB = troopsB * modB
    ratio = strengthA / (strengthA + strengthB + 1e-10)
    
    try:
        model = load_model()
        try:
            probA = model.predict_proba([[ratio]])[0][1] * 100
        except (AttributeError, IndexError):
            prediction = model.predict([[ratio]])[0]
            probA = 75 if prediction == 1 else 25
        probB = 100 - probA
        
        return ('A' if probA > probB else 'B'), probA, probB
    except Exception as e:
        logger.warning(f"Model prediction failed: {e}. Using fallback logic.")
        if ratio > 0.5:
            probA = 60 + (ratio - 0.5) * 80
        else:
            probA = ratio * 120
        probB = 100 - probA
        
        return ('A' if probA > probB else 'B'), probA, probB

def generate_fallback_analysis(countryA: str, countryB: str) -> Dict[str, str]:
    """Generate a fallback economic analysis when API is unavailable."""
    logger.info("Generating fallback economic analysis...")
    
    major_economies = {
        "USA": {"gdp_rank": 1, "military_power": "High", "energy_producer": True, "currency": "USD"},
        "China": {"gdp_rank": 2, "military_power": "High", "energy_producer": False, "currency": "CNY"},
        "Russia": {"gdp_rank": 10, "military_power": "High", "energy_producer": True, "currency": "RUB"},
    }
    
    countryA_data = major_economies.get(countryA, {"gdp_rank": 20, "military_power": "Low", "energy_producer": False, "currency": "Unknown"})
    countryB_data = major_economies.get(countryB, {"gdp_rank": 20, "military_power": "Low", "energy_producer": False, "currency": "Unknown"})
    
    gdp_impact = "3-5% GDP reduction for both countries"
    if countryA_data["gdp_rank"] < countryB_data["gdp_rank"]:
        gdp_impact = f"1-3% GDP reduction for {countryA}, 5-8% GDP reduction for {countryB}"
    elif countryB_data["gdp_rank"] < countryA_data["gdp_rank"]:
        gdp_impact = f"5-8% GDP reduction for {countryA}, 1-3% GDP reduction for {countryB}"
    
    return {
        "gdp_impact": gdp_impact,
        "trade_impact": "20-30% bilateral trade disruption",
        "energy_impact": "25-35% energy price increase globally" if (countryA_data["energy_producer"] or countryB_data["energy_producer"]) else "10-15% energy price increase",
        "currency_impact": f"Volatility in {countryA_data['currency']} and {countryB_data['currency']}",
        "note": "Fallback analysis generated without AI due to API limitations"
    }

def analyze_economic_impact(countryA: str, countryB: str, working_model: str) -> Dict[str, Any]:
    """Analyze economic impact with enhanced error handling and retries."""
    if not working_model:
        return {
            'error': 'Gemini API unavailable',
            'fallback': generate_fallback_analysis(countryA, countryB)
        }

    # Prepare the request exactly like your working curl
    headers = {
        'Content-Type': 'application/json',
    }
    
    payload = {
        "contents": [{
            "parts": [{
                "text": f"""Analyze economic impact between {countryA} and {countryB}.
Return concise JSON with:
- gdp_impact (string)
- trade_impact (string)
- energy_impact (string)
- currency_impact (string)"""
            }]
        }]
    }

    api_url = f"{GEMINI_API_BASE}/{working_model}:generateContent?key={GEMINI_API_KEY}"
    
    # Retry logic
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(
                api_url,
                headers=headers,
                json=payload,
                timeout=30  # Increased timeout
            )
            
            # Handle rate limiting
            if response.status_code == 429:
                wait_time = 2 ** attempt  # Exponential backoff
                logger.warning(f"Rate limited. Waiting {wait_time} seconds...")
                time.sleep(wait_time)
                continue
                
            response.raise_for_status()  # Raises HTTPError for bad status codes
            
            # Parse response - matches curl behavior
            data = response.json()
            text = data['candidates'][0]['content']['parts'][0]['text']
            
            # Clean JSON response
            if text.startswith('```json'):
                text = text[7:-3].strip()
            elif text.startswith('```'):
                text = text[3:-3].strip()
                
            return json.loads(text)
            
        except requests.exceptions.RequestException as e:
            logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt == max_retries - 1:
                return {
                    'error': f"API request failed after {max_retries} attempts: {str(e)}",
                    'fallback': generate_fallback_analysis(countryA, countryB)
                }
            time.sleep(1)  # Brief pause before retry
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse response: {str(e)}")
            return {
                'error': "Invalid API response format",
                'fallback': generate_fallback_analysis(countryA, countryB)
            }
    
    return {
        'error': "Unexpected error in API communication",
        'fallback': generate_fallback_analysis(countryA, countryB)
    }

def main():
    parser = argparse.ArgumentParser(
        description="Predict military conflict outcomes and economic impacts",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument('--countryA', required=True, help="Name of first country")
    parser.add_argument('--countryB', required=True, help="Name of second country")
    parser.add_argument('--troopsA', type=int, required=True, help="Troop count for country A")
    parser.add_argument('--modA', type=float, required=True, help="Modifier for country A")
    parser.add_argument('--troopsB', type=int, required=True, help="Troop count for country B")
    parser.add_argument('--modB', type=float, required=True, help="Modifier for country B")
    
    try:
        args = parser.parse_args()
        
        # Military Prediction
        print("\n" + "="*40)
        print("=== Military Prediction ===".center(40))
        print("="*40)
        winner, probA, probB = predict_outcome(args.troopsA, args.modA, args.troopsB, args.modB)
        print(f"\n{args.countryA} vs {args.countryB}")
        print(f"  Troops: {args.troopsA:,} (x{args.modA:.1f}) vs {args.troopsB:,} (x{args.modB:.1f})")
        print(f"  Predicted Winner: {args.countryA if winner == 'A' else args.countryB}")
        print(f"  Probability: {args.countryA} {probA:.1f}% | {args.countryB} {probB:.1f}%")
        
        # Economic Impact
        print("\n" + "="*40)
        print("=== Economic Impact ===".center(40))
        print("="*40)
        
        api_success, working_model = test_api_connection()
        impact = analyze_economic_impact(args.countryA, args.countryB, working_model)
        
        if 'error' in impact:
            print(f"\n  ⚠ Warning: {impact['error']}")
            print("\n  📊 Fallback Economic Analysis:")
            for metric, value in impact['fallback'].items():
                if metric != 'note':
                    print(f"  • {metric.replace('_', ' ').title()}: {value}")
            print(f"\n  📝 Note: {impact['fallback']['note']}")
        else:
            print("\n  ✅ AI-Powered Economic Analysis:")
            for metric, value in impact.items():
                print(f"  • {metric.replace('_', ' ').title()}: {value}")
                
    except Exception as e:
        logger.error(f"Execution failed: {str(e)}")
        print(f"\n❌ Critical Error: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    print("\n" + "="*50)
    print(" WAR OUTCOME PREDICTION SYSTEM ".center(50, "="))
    print("="*50)
    main()