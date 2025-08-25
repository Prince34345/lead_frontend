import { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import api from "../api/axios";
import { Link } from "react-router";

const Leads = () => {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchLeads = useCallback(async () => {
    const { data } = await api.get("/leads", {
      params: { page: pagination.page, limit: pagination.limit },
    });
    setRowData(data.data);
    setPagination(prev => ({ ...prev, total: data.total }));
  }, [pagination.page, pagination.limit]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const columns = [
    { field: "first_name" },
    { field: "last_name" },
    { field: "email" },
    { field: "company" },
    { field: "status" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <Link to={`/leads/edit/${params.data._id}`} className="text-blue-600">Edit</Link>
          <button
            onClick={async () => {
              await api.delete(`/leads/${params.data._id}`);
              fetchLeads();
            }}
            className="text-red-600"
          >Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link to="/leads/new" className="bg-green-600 text-white px-3 py-1 rounded">+ New Lead</Link>
      </div>
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columns} pagination={false} />
      </div>
      <div className="flex justify-between mt-3">
        <button disabled={pagination.page === 1}
          onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}>
          Prev
        </button>
        <span>Page {pagination.page}</span>
        <button
          disabled={pagination.page * pagination.limit >= pagination.total}
          onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Leads;