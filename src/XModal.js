import React, { useState, useRef, useEffect } from "react";
import './XModal.css'; // Import the CSS for modal styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: ""
  });

  const modalRef = useRef(null);

  // Function to handle clicks outside the modal to close it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add or remove event listener for click events when the modal is open/closed
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Open the modal
  const openModal = () => setIsOpen(true);

  // Close the modal
  const closeModal = () => setIsOpen(false);

  // Input change handler for the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add form validation as needed here...
    
    // Close the modal after successful submission
    closeModal();
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      
      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
                <h1>Fill Details</h1>
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
        </div>
      )}
    </div>
  );
};

export default XModal;
