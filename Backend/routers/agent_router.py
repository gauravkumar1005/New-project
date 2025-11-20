from fastapi import APIRouter, HTTPException
from models import Agent, UpdateAgent
from database import agents_collection
from bson import ObjectId

router = APIRouter()

# Helper function to convert Mongo ObjectId
def serialize_agent(agent):
    agent["_id"] = str(agent["_id"])
    return agent


# ------------------------
# CREATE AGENT
# ------------------------
@router.post("/create")
def create_agent(agent: Agent):
    result = agents_collection.insert_one(agent.dict())
    return {
        "status": "success",
        "message": "Agent created successfully",
        "agent_id": str(result.inserted_id)
    }


# ------------------------
# GET ALL AGENTS
# ------------------------
@router.get("/agents/")
def get_all_agents():
    agents = list(agents_collection.find())
    return [serialize_agent(agent) for agent in agents]


# ------------------------
# GET SINGLE AGENT
# ------------------------
@router.get("/agents/{agent_id}")
def get_agent(agent_id: str):
    agent = agents_collection.find_one({"_id": ObjectId(agent_id)})
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return serialize_agent(agent)


# ------------------------
# UPDATE AGENT
# ------------------------
@router.put("/agents/{agent_id}")
def update_agent(agent_id: str, data: UpdateAgent):
    update_data = {k: v for k, v in data.dict().items() if v is not None}

    result = agents_collection.update_one(
        {"_id": ObjectId(agent_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {"message": "Agent updated successfully"}


# ------------------------
# DELETE AGENT
# ------------------------
@router.delete("/agents/{agent_id}")
def delete_agent(agent_id: str):
    result = agents_collection.delete_one({"_id": ObjectId(agent_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {"message": "Agent deleted successfully"}
