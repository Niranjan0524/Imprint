import React, { useState,useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useDispatch} from 'react-redux';
import { deckNameActions } from '../store/DeckNameSlice';


const LandingPage = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const deckNameRef = useRef(null);

  const dispatch=useDispatch();
  const handleCreateNewDeck = () => {
    console.log("create new deck is clicked");
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    // console.log("Deck Name:", e.target.value);
  };

  const handleSubmit = (e) => {    
    console.log("Deck Name:", deckNameRef.current.value);
    setIsModalOpen(false);
    setNotification(`Deck "${deckNameRef.current.value}" created successfully!`);


    dispatch(deckNameActions.addDeckName(deckNameRef.current.value));
    deckNameRef.current.value = '';
    
    setTimeout(() => {
      setNotification('');
    }, 3000);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleViewDecks = () => {
    console.log("View Decks is clicked");
  };

  return (
    <>
      <div className="landing-container2">
        <Header />
        <div className="landing-container">
          <div className="welcome-box">
            <h2 className="welcome-title">
              Welcome to Anki-Like App
            </h2>
            <h5 className="subtitle">
              Manage your flashcards, enhance your learning, and track progress!
            </h5>
            <div className="action-buttons">
              <button
                type="button"
                className="create-button btn btn-outline-primary"
                onClick={handleCreateNewDeck}
              >
                Create New Deck
              </button>
              <button
                type="button"
                className="view-button btn btn-outline-success"
                onClick={handleViewDecks}
              >
                View Decks
              </button>
            </div>
            {isModalOpen && (
              

              <div className="random">
             
                <div class="col">
                <input type="text" 
                class="form-control" 
                placeholder="Enter DeckName:"                
                ref={deckNameRef}
                onChange={handleInputChange}/>
                <button type="button" class="btn k btn-primary btn-sm" onClick={handleSubmit}>Add Deck</button>
                <button type="button" class="btn k btn-secondary btn-sm" onClick={handleCancel}>Delete</button>
              </div>
              </div>
              // <div className="modal">
              // <div className="modal-content">
              //   <h2>Enter Deck Name</h2>
              //   <input
              //     type="text"
              //     value={deckName}
              //     onChange={handleInputChange}
              //     placeholder="Deck Name"
              //   />
              //   <button onClick={handleSubmit}>Submit</button>
              //   <button onClick={handleCancel}>Cancel</button>
              // </div>
              // </div>
              )}
               {notification && (
                  <div className="notification">
                    {notification}
                  </div>
                )}
          </div>
        </div>
       
        <Footer />
      </div>
      
    </>
  );
};

export default LandingPage;
