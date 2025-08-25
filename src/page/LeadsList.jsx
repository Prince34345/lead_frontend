import { useEffect } from "react";
import { Link } from "react-router";
import { AgGridReact } from "ag-grid-react";
import { useLeads } from "../context/leadContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const LeadsList = () => {
  const { leads, fetchLeads, pagination, setPagination, loading, deleteLead } = useLeads();

  useEffect(() => {
    fetchLeads({ page: pagination.page, limit: pagination.limit });
  }, [pagination.page]);

  const columns = [
    { headerName: "First Name", field: "first_name", flex: 1 },
    { headerName: "Last Name", field: "last_name", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    { headerName: "Phone", field: "phone", flex: 1 },
    { headerName: "Company", field: "company", flex: 1 },
    { headerName: "Status", field: "status", flex: 1 },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div className="flex gap-2">
          <Link to={`/leads/edit/${params.value}`} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
            Edit
          </Link>
          <button
            onClick={() => deleteLead(params.value)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Delete
          </button>
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
        <AgGridReact rowData={leads} columnDefs={columns} pagination={false} overlayLoadingTemplate="Loading..." />
      </div>
      <div className="flex justify-between mt-3">
        <button
          disabled={pagination.page === 1 || loading}
          onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button
          disabled={pagination.page * pagination.limit >= pagination.total || loading}
          onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadsList;