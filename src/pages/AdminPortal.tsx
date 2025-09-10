import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import LiveMap from "@/components/admin/LiveMap";
import IssuesManagement from "@/components/admin/IssuesManagement";
import DepartmentAssignments from "@/components/admin/DepartmentAssignments";
import Analytics from "@/components/admin/Analytics";
import Settings from "@/components/admin/Settings";
import WorkerAssignment from "@/components/admin/WorkerAssignment";

const AdminPortal = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/issues" element={<IssuesManagement />} />
        <Route path="/departments" element={<DepartmentAssignments />} />
        <Route path="/workers" element={<WorkerAssignment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortal;