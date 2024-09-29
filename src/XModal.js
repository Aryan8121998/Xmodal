import React, { useState, useRef, useEffect } from "react";
import './XModal.css'; // Add your styling here

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: ""
  });

  const modalRef = useRef(null);

  // Handle clicks outside modal to close it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener when modal is opened
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when component is unmounted or modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Open modal
  const openModal = () => setIsOpen(true);

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.username) {
      alert("Username is required.");
      return;
    }

    const emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    if (!formData.phone || formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(formData.dob);

    if (!formData.dob || selectedDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    // If all validations pass, reset form and close modal
    setFormData({ username: "", email: "", dob: "", phone: "" });
    closeModal();
  };

  return (
    <div className="modal">
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      
      {isOpen && (
        <div className="modal-content" ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />

            <label htmlFor="email">Email</label>
            <input
              type="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />

            <label htmlFor="dob">Date of Birth</label>
            <input 
              type="date" 
              id="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              required 
            />

            <label htmlFor="phone">Phone Number</label>
            <input 
              type="text" 
              id="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default XModal;
