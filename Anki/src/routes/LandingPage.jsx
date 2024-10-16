import React, { useState,useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useDispatch} from 'react-redux';
import { deckNameActions } from '../store/DeckNameSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeckNameCard from '../components/deckNameCard';

const LandingPage = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [viewDeck,setViewDeck]=useState(false);

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
    


    console.log(deckItems)

    setTimeout(() => {
      setNotification('');
    }, 3000);
    
  };


  const deckItems=useSelector((store)=>store.deckNames)


  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleViewDecks = () => {
    console.log("View Decks is clicked");
    setViewDeck(true);
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
            
              )}

              {notification && (
                  <div className="notification">
                    {notification}
                  </div>
              )}

              {
               viewDeck &&
                deckItems.map((ITM)=>(
                  <DeckNameCard name={ITM} key={ITM}>

                  </DeckNameCard>
                  
                ))

              }
            
          </div>
        </div>
       
        <Footer />
      </div>
      
    </>
  );
};

export default LandingPage;
