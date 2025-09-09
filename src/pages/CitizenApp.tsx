import { Routes, Route, Navigate } from "react-router-dom";
import CitizenLayout from "@/components/citizen/CitizenLayout";
import ReportIssue from "@/components/citizen/ReportIssue";
import IssueMap from "@/components/citizen/IssueMap";
import MyReports from "@/components/citizen/MyReports";
import Notifications from "@/components/citizen/Notifications";
import Profile from "@/components/citizen/Profile";

const CitizenApp = () => {
  return (
    <CitizenLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/citizen/report" replace />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/map" element={<IssueMap />} />
        <Route path="/reports" element={<MyReports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </CitizenLayout>
  );
};

export default CitizenApp;