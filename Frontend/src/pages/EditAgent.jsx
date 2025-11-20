import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Helper
const formatDateISO = (d) => d.toISOString().slice(0, 10);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Calendar = ({ year, month, events, onDateClick }) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  const weeks = [];
  let day = 1 - startWeekday;

  for (let wk = 0; wk < 6; wk++) {
    const row = [];
    for (let i = 0; i < 7; i++, day++) {
      const d = new Date(year, month, day);
      const iso = formatDateISO(d);
      row.push({ date: d, iso, inMonth: d.getMonth() === month });
    }
    weeks.push(row);
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-2 text-center font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
        {weeks.flat().map((c, i) => {
          const hasEvent = events.some((e) => e.date === c.iso);

          return (
            <button
              key={i}
              onClick={() => onDateClick(c.date)}
              className={`p-2 min-h-[70px] rounded-md text-left 
                ${c.inMonth ? "bg-white" : "bg-gray-100 text-gray-400"}
                ${hasEvent ? "ring-2 ring-yellow-300" : ""}
                hover:bg-gray-200`}
            >
              <div className="font-semibold">{c.date.getDate()}</div>
              {hasEvent && (
                <div className="text-xs mt-1">
                  {events.filter((e) => e.date === c.iso).length} event(s)
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const EditAgent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States same as CreateAgent
  const [enableSecurityPin, setEnableSecurityPin] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [voiceLanguage, setVoiceLanguage] = useState("");
  const [identityPrompt, setIdentityPrompt] = useState("");
  const [hints, setHints] = useState("");
  const [securityPin, setSecurityPin] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");

  const [agentType, setAgentType] = useState("information");

  const [items, setItems] = useState([]);
  const addItem = () =>
    setItems([...items, { id: Date.now(), name: "", qty: 1, price: 0 }]);
  const updateItem = (id, f, v) =>
    setItems(items.map((x) => (x.id === id ? { ...x, [f]: v } : x)));
  const removeItem = (id) => setItems(items.filter((x) => x.id !== id));

  // Event calendar
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [events, setEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [modalData, setModalData] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
  });

  // Prefill modal time when date clicked
  useEffect(() => {
    if (modalDate) {
      const iso = formatDateISO(modalDate);
      setModalData({
        title: "",
        start: `${iso}T09:00`,
        end: `${iso}T10:00`,
        desc: "",
      });
    }
  }, [modalDate]);

  const saveEvent = () => {
    const iso = formatDateISO(modalDate);
    setEvents([...events, { id: Date.now(), date: iso, ...modalData }]);
    setIsModalOpen(false);
  };

  // Load AGENT for Editing
  useEffect(() => {
    const loadAgent = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/agents/${id}`);
        const data = await res.json();

        setName(data.name);
        setPhone(data.phone);
        setVoiceLanguage(data.voiceLanguage);
        setIdentityPrompt(data.identityPrompt);
        setHints(data.hints);
        setKnowledgeBase(data.knowledgeBase);
        setEnabled(data.enabled);

        setAgentType(data.agentType);

        setEnableSecurityPin(data.securityPinEnabled);
        setSecurityPin(data.securityPin || "");

        setItems(data.items || []);
        setEvents(data.events || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadAgent();
  }, [id]);

  // Update Agent
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      phone,
      agentType,
      voiceLanguage,
      identityPrompt,
      hints,
      securityPinEnabled: enableSecurityPin,
      securityPin: enableSecurityPin ? securityPin : null,
      enabled,
      knowledgeBase,
      items: agentType === "shop" ? items : [],
      events: agentType === "event" ? events : [],
    };

    try {
      await fetch(`${BACKEND_URL}/agents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Agent updated successfully!");
      navigate("/my-agents");
    } catch (err) {
      alert("Update failed");
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
          <h1 className="text-3xl font-semibold mb-6">Edit Agent</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SAME FORM AS CREATE PAGE */}
            {/* NAME */}
            <div>
              <label className="font-medium">Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 w-full rounded-md"
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="font-medium">Agent Type</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="border p-3 w-full rounded-md"
              >
                <option value="information">Information Assistant</option>
                <option value="shop">Shop/Store Agent</option>
                <option value="event">Event Assistant</option>
              </select>
            </div>

            {/* SHOP ITEMS */}
            {agentType === "shop" && (
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-3">Inventory Items</h3>

                {items.map((it) => (
                  <div
                    key={it.id}
                    className="grid grid-cols-12 gap-3 items-center mb-3"
                  >
                    <input
                      className="col-span-6 border p-2 rounded"
                      value={it.name}
                      onChange={(e) =>
                        updateItem(it.id, "name", e.target.value)
                      }
                      placeholder="Item name"
                    />
                    <input
                      type="number"
                      className="col-span-3 border p-2 rounded text-center"
                      value={it.qty}
                      onChange={(e) =>
                        updateItem(it.id, "qty", Number(e.target.value))
                      }
                    />
                    <input
                      type="number"
                      className="col-span-2 border p-2 rounded text-center"
                      value={it.price}
                      onChange={(e) =>
                        updateItem(it.id, "price", Number(e.target.value))
                      }
                    />
                    <button
                      type="button"
                      className="col-span-1 text-red-600"
                      onClick={() => removeItem(it.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={addItem}
                >
                  + Add Item
                </button>
              </div>
            )}

            {/* EVENT CALENDAR */}
            {agentType === "event" && (
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-3">Calendar</h3>

                <div className="flex justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => setCalMonth((m) => (m === 0 ? 11 : m - 1))}
                  >
                    ◀
                  </button>
                  <strong>
                    {new Date(calYear, calMonth).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCalMonth((m) => (m === 11 ? 0 : m + 1))}
                  >
                    ▶
                  </button>
                </div>

                <Calendar
                  year={calYear}
                  month={calMonth}
                  events={events}
                  onDateClick={(d) => {
                    setModalDate(d);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            )}

            {/* Security PIN */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enableSecurityPin}
                onChange={() => setEnableSecurityPin(!enableSecurityPin)}
              />
              <label>Add security PIN</label>
            </div>

            {enableSecurityPin && (
              <div>
                <label className="font-medium">Security PIN</label>
                <input
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="border p-3 w-full rounded-md"
                />
              </div>
            )}

            {/* Phone */}
            <div>
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-3 w-full rounded-md"
              />
            </div>

            {/* Voice */}
            <div>
              <label>Voice Language</label>
              <input
                value={voiceLanguage}
                onChange={(e) => setVoiceLanguage(e.target.value)}
                className="border p-3 w-full rounded-md"
              />
            </div>

            {/* Identity Prompt */}
            <div>
              <label>Identity Prompt</label>
              <textarea
                value={identityPrompt}
                onChange={(e) => setIdentityPrompt(e.target.value)}
                className="border p-3 w-full rounded-md"
                rows={3}
              />
            </div>

            {/* Hints */}
            <div>
              <label>Hints</label>
              <textarea
                value={hints}
                onChange={(e) => setHints(e.target.value)}
                className="border p-3 w-full rounded-md"
                rows={3}
              />
            </div>

            {/* Enable */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
              <label>Enable Agent</label>
            </div>

            {/* Knowledge Base */}
            <div>
              <label>Knowledge Base *</label>
              <textarea
                required
                value={knowledgeBase}
                onChange={(e) => setKnowledgeBase(e.target.value)}
                className="border p-3 w-full rounded-md"
                rows={5}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-md w-full"
            >
              Update Agent
            </button>
          </form>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
              <div className="bg-white p-6 rounded-md w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3">Create Event</h3>

                <label>Title</label>
                <input
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                  className="border p-2 w-full rounded mb-3"
                />

                <label>Start</label>
                <input
                  type="datetime-local"
                  value={modalData.start}
                  onChange={(e) =>
                    setModalData({ ...modalData, start: e.target.value })
                  }
                  className="border p-2 w-full rounded mb-3"
                />

                <label>End</label>
                <input
                  type="datetime-local"
                  value={modalData.end}
                  onChange={(e) =>
                    setModalData({ ...modalData, end: e.target.value })
                  }
                  className="border p-2 w-full rounded mb-3"
                />

                <label>Description</label>
                <textarea
                  value={modalData.desc}
                  onChange={(e) =>
                    setModalData({ ...modalData, desc: e.target.value })
                  }
                  className="border p-2 w-full rounded mb-3"
                />

                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={saveEvent}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EditAgent;
