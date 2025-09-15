import { Routes, Route, Navigate } from "react-router-dom";
import WorkerLayout from "@/components/worker/WorkerLayout";
import WorkerAssignments from "@/components/worker/WorkerAssignments";
import TaskCapture from "@/components/worker/TaskCapture";

const WorkerPortal = () => {
  return (
    <WorkerLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/worker/assignments" replace />} />
        <Route path="/assignments" element={<WorkerAssignments />} />
        <Route path="/active" element={<WorkerAssignments />} />
        <Route path="/completed" element={<WorkerAssignments />} />
        <Route path="/capture" element={<TaskCapture />} />
      </Routes>
    </WorkerLayout>
  );
};

export default WorkerPortal;