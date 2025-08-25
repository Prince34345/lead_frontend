import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useLeads } from "../context/leadContext";

export default function LeadDetails() {
  const { id } = useParams();
  const { getLeadById } = useLeads();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getLeadById(id);
      setLead(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!lead) return <p className="p-4">Lead not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {lead.first_name} {lead.last_name}
        </h1>
        <Link to="/leads" className="text-blue-600">← Back to Leads</Link>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-white shadow rounded-2xl p-6">
        <div>
          <p className="text-gray-500">Email</p>
          <p>{lead.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p>{lead.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Company</p>
          <p>{lead.company}</p>
        </div>
        <div>
          <p className="text-gray-500">City / State</p>
          <p>{lead.city}, {lead.state}</p>
        </div>
        <div>
          <p className="text-gray-500">Source</p>
          <p>{lead.source}</p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <p className="capitalize">{lead.status}</p>
        </div>
        <div>
          <p className="text-gray-500">Score</p>
          <p>{lead.score}</p>
        </div>
        <div>
          <p className="text-gray-500">Lead Value</p>
          <p>₹{lead.lead_value}</p>
        </div>
        <div>
          <p className="text-gray-500">Last Activity</p>
          <p>{lead.last_activity_at ? new Date(lead.last_activity_at).toLocaleDateString() : "No activity"}</p>
        </div>
        <div>
          <p className="text-gray-500">Qualified</p>
          <p>{lead.is_qualified ? "Yes" : "No"}</p>
        </div>
        <div>
          <p className="text-gray-500">Created At</p>
          <p>{new Date(lead.created_at).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Updated At</p>
          <p>{new Date(lead.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}