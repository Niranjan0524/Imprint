import React, { useState } from 'react';
import './AddCard.css'; 

const AddCard = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    type: '',
    deck: '',
    front: '',
    back: '',
    tags: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Do something with the form data (send to server, etc.)
    // Reset form after submission
    setFormData({
      type: '',
      deck: '',
      front: '',
      back: '',
      tags: ''
    });
  };

  return (
    <div className="add-card-container">
      <h2>Add a New Card</h2>
      <form onSubmit={handleSubmit} className="add-card-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            placeholder="Enter card type"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deck">Deck</label>
          <input
            type="text"
            id="deck"
            name="deck"
            value={formData.deck}
            onChange={handleInputChange}
            required
            placeholder="Enter deck name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            value={formData.front}
            onChange={handleInputChange}
            required
            placeholder="Front of the card"
          />
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            value={formData.back}
            onChange={handleInputChange}
            required
            placeholder="Back of the card"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            required
            placeholder="Add comma-separated tags"
          />
        </div>

        <button type="submit" className="submit-button">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
