import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../Toast";
import ModalBox from "../Modal";
import AddUserTable from "../AddUserTable";
import { BASE_URL } from "../../config/config";

function AddTPO() {
  document.title = "CPMS | TPO Users";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  // Fetch TPO users
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/management/tpo-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data?.tpoUsers || []);
    } catch (error) {
      console.error("Error fetching TPO users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Add new TPO
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/management/addtpo`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        setData({ first_name: "", email: "", number: "", password: "" });
        setFormOpen(false);
        fetchUserDetails();
      }
    } catch (error) {
      console.error("Error adding TPO:", error);
      setToastMessage("Failed to add TPO user!");
      setShowToast(true);
    }
  };

  // Delete TPO
  const handleDeleteUser = (email) => {
    setUserToDelete(email);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/management/deletetpo`,
        { email: userToDelete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.error("Error deleting TPO user:", error);
      setToastMessage("Failed to delete TPO user!");
      setShowToast(true);
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  return (
    <>
      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="top-center"
      />

      {/* Table + Form */}
      <AddUserTable
        users={users}
        loading={loading}
        handleDeleteUser={handleDeleteUser}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        data={data}
        handleDataChange={handleDataChange}
        handleSubmit={handleSubmit}
        userToAdd={"TPO Admin"}
      />

      {/* Modal for delete confirmation */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header="Confirmation"
        body={`Do you want to delete ${userToDelete}?`}
        btn="Delete"
        confirmAction={confirmDelete}
      />
    </>
  );
}

export default AddTPO;