from pydantic import BaseModel
from typing import List, Optional

class ShopItem(BaseModel):
    name: str
    qty: int
    price: float

class EventItem(BaseModel):
    id: str
    date: str
    title: str
    start: str
    end: str
    desc: str

class Agent(BaseModel):
    name: str
    agentType: str
    phone: Optional[str] = None
    voiceLanguage: Optional[str] = None
    identityPrompt: Optional[str] = None
    hints: Optional[str] = None
    securityPinEnabled: bool = False
    securityPin: Optional[str] = None
    enabled: bool = False
    knowledgeBase: str
    items: Optional[List[ShopItem]] = None
    events: Optional[List[EventItem]] = None


# ----------------------------------------
# ✅ UpdateAgent — All fields optional
# ----------------------------------------
class UpdateAgent(BaseModel):
    name: Optional[str] = None
    agentType: Optional[str] = None
    phone: Optional[str] = None
    voiceLanguage: Optional[str] = None
    identityPrompt: Optional[str] = None
    hints: Optional[str] = None
    securityPinEnabled: Optional[bool] = None
    securityPin: Optional[str] = None
    enabled: Optional[bool] = None
    knowledgeBase: Optional[str] = None
    items: Optional[List[ShopItem]] = None
    events: Optional[List[EventItem]] = None
