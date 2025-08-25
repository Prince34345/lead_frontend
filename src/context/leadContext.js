import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const getLeads = async (page = pagination.page, limit = pagination.limit) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/app/leads?page=${page}&limit=${limit}`);
      setLeads(data.leads);
      setPagination({ page: data.page, limit: data.limit, total: data.total });
    } finally {
      setLoading(false);
    }
  };

  const getLeadById = async (id) => {
    const { data } = await api.get(`/app/leads/${id}`);
    return data;
  };

  const createLead = async (lead) => {
    const { data } = await api.post("/app/leads", lead);
    setLeads((prev) => [data, ...prev]);
    return data;
  };

  const updateLeadById = async (id, lead) => {
    const { data } = await api.put(`/app/leads/${id}`, lead);
    setLeads((prev) => prev.map((l) => (l._id === id ? data : l)));
    return data;
  };

  const deleteLeadById = async (id) => {
    await api.delete(`/app/leads/${id}`);
    setLeads((prev) => prev.filter((l) => l._id !== id));
  };

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <LeadContext.Provider value={{ leads, loading, pagination, getLeads, getLeadById, createLead, updateLeadById, deleteLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => useContext(LeadContext);