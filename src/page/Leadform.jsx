import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    company: "", city: "", state: "", source: "website", status: "new",
    score: 0, lead_value: 0, is_qualified: false,
  });

  useEffect(() => {
    if (id) {
      api.get(`/leads/${id}`).then(({ data }) => setForm(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/leads/${id}`, form);
    else await api.post("/leads", form);
    navigate("/leads");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">{id ? "Edit Lead" : "New Lead"}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["first_name","last_name","email","phone","company","city","state"].map(field => (
          <input key={field} className="border p-2 w-full" placeholder={field}
            value={form[field] || ""}
            onChange={e => setForm({ ...form, [field]: e.target.value })} />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default LeadForm;