import { useState, useEffect } from "react";
import api from "../api/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchLeads = async () => {
    const res = await api.get(`/leads?page=${pagination.page}&limit=${pagination.limit}`);
    setRowData(res.data.data);
    setPagination(prev => ({ ...prev, total: res.data.total }));
  };

  useEffect(() => { fetchLeads(); }, [pagination.page]);

  const columns = [
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Email", field: "email" },
    { headerName: "Company", field: "company" },
    { headerName: "Status", field: "status" },
    { headerName: "Score", field: "score" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={columns} pagination={true} />
    </div>
  );
}