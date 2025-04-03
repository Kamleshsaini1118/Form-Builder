import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Toast Added
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import SubmitForm from "./pages/SubmitForm";
import ViewResponses from "./pages/ViewResponses";
import Dashboard from "./pages/admin/Dashboard";
import ManageForms from "./pages/admin/ManageForms";
import FormResponses from "./pages/admin/FormResponses";
import React from "react";
import EditForm from "./pages/EditForm";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/submit-form/:formId" element={<SubmitForm />} />
            <Route path="/view-responses" element={<ViewResponses />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/manage-forms" element={<ManageForms />} />
            <Route path="/admin/form-responses/:formId" element={<FormResponses />} />

             {/* ✅ Edit Form Route */}
             <Route path="/edit-form/:formId" element={<EditForm />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* ✅ Global Toaster for Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
};

export default App;
