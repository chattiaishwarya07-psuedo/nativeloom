"""
Native Loom AI Backend
FastAPI server serving free, high-efficiency AI model pipelines:
1) Photo Enhancement: RetinexFormer + OpenCV + BiRefNet (only when required)
2) Voice Recognition & Translation: Whisper + IndicTrans2 1B
3) Price Prediction: XGBoost
4) Smart Catalogue: Qwen2.5-VL-7B-Instruct
5) AI Suggestion: Hybrid Recommendation Engine (XGBoost Demand Forecaster + Qwen2.5-VL Portfolio Understanding)
"""

from fastapi import FastAPI, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from pathlib import Path
from typing import Optional, List
import shutil
import uuid

# Import our 5 modular AI services
from services.image_service import enhance_image, PhotoEnhancer
from services.voice_service import transcribe_and_translate
from services.pricing_service import predict_craft_price
from services.catalogue_service import generate_smart_catalogue
from services.recommendation_service import get_hybrid_suggestions, get_price_analysis


BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"

UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

app = FastAPI(
    title="Native Loom AI Backend",
    description="High-efficiency Free AI Model Integration for Indian Artisans",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

enhancer = PhotoEnhancer()


# Pydantic schemas for structured requests
class VoiceRequest(BaseModel):
    custom_text: Optional[str] = None
    source_lang: Optional[str] = "bho_Deva"

class PricePredictionRequest(BaseModel):
    craft_category: Optional[str] = "Terracotta Pottery"
    handcraft_hours: Optional[float] = 16.0
    raw_material_cost: Optional[float] = 140.0
    kiln_firing_cost: Optional[float] = 70.0
    loss_reserve: Optional[float] = 40.0
    gi_certified: Optional[bool] = True
    demand_index: Optional[float] = 1.25

class CatalogueRequest(BaseModel):
    image_path: Optional[str] = None
    image_base64: Optional[str] = None

class PriceAnalysisRequest(BaseModel):
    craft_type: Optional[str] = "Festive Diyas Set"


# =====================================================================
# Health Check & Service Registry
# =====================================================================
@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "Native Loom AI Backend",
        "models": {
            "photo_enhancement": "RetinexFormer + OpenCV + BiRefNet",
            "voice_and_translation": "Whisper + IndicTrans2 1B",
            "price_prediction": "XGBoost Regressor",
            "smart_catalogue": "Qwen2.5-VL-7B-Instruct",
            "ai_suggestion": "Hybrid Engine (XGBoost Demand + Qwen2.5-VL Portfolio)"
        }
    }


# =====================================================================
# 1) Photo Enhancement: RetinexFormer + OpenCV + BiRefNet
# =====================================================================
@app.post("/api/image/enhance")
@app.post("/api/ai/enhance-photo")
async def enhance_product_photo(
    file: UploadFile = File(...),
    apply_retinex: bool = Form(True),
    apply_opencv: bool = Form(True),
    apply_birefnet: bool = Form(True)
):
    """
    Photo enhancement combining RetinexFormer illumination-guided attention,
    OpenCV CIELAB CLAHE & bilateral texture preservation,
    and BiRefNet bilateral reference salient background studio presentation.
    """
    file_id = str(uuid.uuid4())
    input_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
    output_path = OUTPUT_DIR / f"{file_id}_enhanced.jpg"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    res = enhancer.enhance(
        input_path=str(input_path),
        output_path=str(output_path),
        apply_retinex=apply_retinex,
        apply_opencv_polish=apply_opencv,
        apply_birefnet=apply_birefnet
    )

    return FileResponse(
        res["output_path"],
        media_type="image/jpeg",
        filename="native_loom_enhanced.jpg",
        headers={
            "X-Model-RetinexFormer": str(apply_retinex),
            "X-Model-OpenCV": str(apply_opencv),
            "X-Model-BiRefNet": str(apply_birefnet)
        }
    )


# =====================================================================
# 2) Voice Recognition & Translation: Whisper + IndicTrans2 1B
# =====================================================================
@app.post("/api/ai/voice-transcribe-translate")
async def voice_recognition_and_translation(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    source_lang: Optional[str] = Form("bho_Deva")
):
    """
    Whisper Multilingual ASR for spoken regional dialects (Bhojpuri/Hindi),
    followed by IndicTrans2 1B for fluent English storytelling for global buyers.
    """
    audio_bytes = None
    if file:
        audio_bytes = await file.read()

    result = transcribe_and_translate(
        audio_bytes=audio_bytes,
        custom_text=text,
        source_lang=source_lang or "bho_Deva"
    )
    return JSONResponse(result)

@app.post("/api/ai/voice-json")
def voice_from_json(body: VoiceRequest):
    result = transcribe_and_translate(
        custom_text=body.custom_text,
        source_lang=body.source_lang or "bho_Deva"
    )
    return JSONResponse(result)


# =====================================================================
# 3) Price Prediction: XGBoost
# =====================================================================
@app.post("/api/ai/price-prediction")
def predict_price(body: PricePredictionRequest):
    """
    XGBoost Regressor for Fair Trade Craft Pricing with cost breakdown
    and feature importances.
    """
    res = predict_craft_price(
        craft_category=body.craft_category,
        handcraft_hours=body.handcraft_hours,
        raw_material_cost=body.raw_material_cost,
        kiln_firing_cost=body.kiln_firing_cost,
        loss_reserve=body.loss_reserve,
        gi_certified=body.gi_certified,
        demand_index=body.demand_index
    )
    return JSONResponse(res)


# =====================================================================
# 4) Smart Catalogue: Qwen2.5-VL-7B-Instruct
# =====================================================================
@app.post("/api/ai/smart-catalogue")
async def smart_catalogue(
    file: Optional[UploadFile] = File(None),
    image_path: Optional[str] = Form(None)
):
    """
    Qwen2.5-VL-7B-Instruct Vision-Language understanding for craft
    identification, GI-tag cluster provenance, and metadata cataloguing.
    """
    target_path = image_path
    if file:
        file_id = str(uuid.uuid4())
        save_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        target_path = str(save_path)

    res = generate_smart_catalogue(image_path=target_path)
    return JSONResponse(res)

@app.post("/api/ai/smart-catalogue-json")
def smart_catalogue_json(body: CatalogueRequest):
    res = generate_smart_catalogue(image_path=body.image_path, image_base64=body.image_base64)
    return JSONResponse(res)


# =====================================================================
# 5) AI Suggestion: Hybrid Engine (XGBoost Demand + Qwen2.5-VL)
# =====================================================================
@app.get("/api/ai/suggestions")
@app.post("/api/ai/suggestions")
def artisan_suggestions(artisan_id: str = "artisan-gorakhpur-01"):
    """
    Hybrid recommendation engine:
    XGBoost forecasts consumer demand surges (Diwali +45%),
    while Qwen2.5-VL visualizes artisan's existing shop and craft strengths.
    """
    res = get_hybrid_suggestions(artisan_id=artisan_id)
    return JSONResponse(res)

@app.post("/api/ai/request-price-analysis")
def request_price_analysis(body: PriceAnalysisRequest):
    """
    XGBoost Margin Analysis for recommended batch production.
    """
    res = get_price_analysis(craft_type=body.craft_type or "Festive Diyas Set")
    return JSONResponse(res)