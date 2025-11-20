import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyAgents from "./pages/MyAgents";
import CreateAgent from "./pages/CreateAgent";
import MyPhoneNumber from "./pages/MyPhoneNumber";
import PurchaseNumber from "./pages/PurchaseNumber";
import Billing from "./pages/Billing";
import People from "./pages/People";
import Trial from "./pages/trial";
import EditAgent from "./pages/EditAgent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/my-agents" element={<MyAgents />} />
          <Route path="/create-agents" element={<CreateAgent />} />
          <Route path="/my-phone-numbers" element={<MyPhoneNumber />} />
          <Route path="/purchase-phone-number" element={<PurchaseNumber />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/people" element={<People/>} />
          <Route path="/edit-agent/:id" element={<EditAgent />} />
          <Route path="/start-trial" element={<Trial/>} />
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
