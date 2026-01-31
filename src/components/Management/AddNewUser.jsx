import { useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import axios from "axios";
import Toast from "../Toast";
import ModalBox from "../Modal";
import { BASE_URL } from "../../config/config";
import { useLocation } from "react-router-dom";

function AddNewUser() {
  document.title = "CPMS | Add New User";
  const location = useLocation();

  // Detect which type of user to add: management / tpo / student
  const pathParts = location.pathname.split("/").filter(Boolean);
  const userToAdd = pathParts.find((part) =>
    ["management", "tpo", "student"].includes(part)
  );

  const [data, setData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: "",
    sendMail: true,
  });

  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const handleDataChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // Validate and open modal
  const handleModalSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!data.first_name) newError.first_name = "Name required!";
    if (!data.email) newError.email = "Email required!";
    if (!data.number) newError.number = "Number required!";
    if (!data.password) newError.password = "Initial password required!";

    if (Object.keys(newError).length > 0) return setError(newError);

    setShowModal(true);
  };

  // Unified submit handler for all user types
  const handleSubmitUser = async () => {
    let endpoint = "";
    let roleName = "";

    switch (userToAdd) {
      case "management":
        endpoint = "/management/add-management";
        roleName = "Management";
        break;
      case "tpo":
        endpoint = "/management/addtpo";
        roleName = "TPO";
        break;
      case "student":
        endpoint = "/management/add-student";
        roleName = "Student";
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response?.data?.msg === "User Created!") {
        if (data.sendMail) {
          const subject = encodeURIComponent("Welcome to the team!");
          const body = encodeURIComponent(
            `Hi ${data.first_name},\n\nWelcome to our team as a ${roleName}!\n\nYour login credentials:\nID: ${data.email}\nPassword: ${data.password}\n\nPlease change your password ASAP.\n\nBest regards,\nAdmin Team`
          );

          const mailtoLink = document.createElement("a");
          mailtoLink.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
          mailtoLink.target = "_blank";
          document.body.appendChild(mailtoLink);
          mailtoLink.click();
          document.body.removeChild(mailtoLink);
        }

        setToastMessage(response.data.msg);
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setToastMessage("Failed to create user!");
      setShowToast(true);
    } finally {
      setShowModal(false);
    }
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

      {/* Form */}
      <div className="flex justify-center items-center h-full max-md:h-fit text-base max-sm:text-sm">
        <div className="my-4 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-8 shadow shadow-red-400 w-fit">
          <Form onSubmit={handleModalSubmit} className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-sm:gap-x-1 max-sm:gap-y-1">
                <div>
                  <FloatingLabel label={<span>Name <span className="text-red-500">*</span></span>}>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="first_name"
                      value={data.first_name}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>
                  <span className="text-red-500">{error.first_name}</span>
                </div>

                <div>
                  <FloatingLabel label={<span>Email <span className="text-red-500">*</span></span>}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>
                  <span className="text-red-500">{error.email}</span>
                </div>

                <div>
                  <FloatingLabel label={<span>Number <span className="text-red-500">*</span></span>}>
                    <Form.Control
                      type="number"
                      placeholder="Phone Number"
                      name="number"
                      value={data.number}
                      onInput={(e) => {
                        if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
                      }}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>
                  <span className="text-red-500">{error.number}</span>
                </div>

                <div>
                  <FloatingLabel label={<span>Initial Password <span className="text-red-500">*</span></span>}>
                    <Form.Control
                      type="password"
                      placeholder="Enter Initial Password"
                      name="password"
                      value={data.password}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>
                  <span className="text-red-500">{error.password}</span>
                </div>
              </div>

              <Form.Check
                label="Send user email about creation of account"
                name="sendMail"
                onChange={(e) => setData({ ...data, sendMail: e.target.checked })}
                checked={data.sendMail}
              />
            </div>

            <button type="submit" className="my-1 flex items-center px-3 py-2 bg-blue-500 text-white rounded">
              <GrFormAdd className="mr-2 text-3xl max-sm:text-lg max-sm:mr-0.5" />
              Create New
            </button>
          </Form>
        </div>
      </div>

      {/* Modal */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header="Confirmation"
        body={`Do you want to create new user${data.sendMail ? ` and send email to ${data.email}` : ""}?`}
        btn="Create"
        confirmAction={handleSubmitUser}
      />
    </>
  );
}

export default AddNewUser;