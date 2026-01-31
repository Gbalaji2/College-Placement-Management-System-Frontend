import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

function StudentDetail() {
  const { studentId } = useParams(); 
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized, please login");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/admin/student/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentData(response.data);
      } catch (err) {
        console.error("Error fetching student data", err);
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!studentData) return <div>No student data found.</div>;

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-2">{studentData.first_name} {studentData.last_name}</h2>
      <p><strong>Email:</strong> {studentData.email}</p>
      <p><strong>Phone:</strong> {studentData.number}</p>
      <p><strong>Branch:</strong> {studentData.branch}</p>
      <p><strong>Year:</strong> {studentData.year}</p>
      {/* Add more fields if available */}
    </div>
  );
}

export default StudentDetail;