import React, { useRef, useState } from "react";
import "../components/AddCard.css";
import Header from "../components/Header";

const AddCard = () => {
  const [notification, setNotification] = useState("");

  const deckNameRef = useRef("");
  const frontRef = useRef("");
  const backRef = useRef("");
  const tagsRef = useRef("");

  const [mcq, setMcq] = useState(false);

  const handleSubmit = () => {
    const deckNamevalue = deckNameRef.current.value;
    const frontvalue = frontRef.current.value;
    const backvalue = backRef.current.value;
    const tagsValue = tagsRef.current.value;

    console.log(deckNamevalue);
    deckNameRef.current.value = "";
    frontRef.current.value = "";
    backRef.current.value = "";
    tagsRef.current.value = "";

    setNotification(`Card added successfully!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleMcq = () => {
    console.log("MCQ");
    setMcq(true);
  };

  const handleBasic = () => {
    console.log("Basic");
    setMcq(false);
  };

  const handleGenerate = () => {
    console.log("Generate");
  };
  return (
    <>
      <div className="AddCardContainer">
        <Header />
        {notification && <div className="notification">{notification}</div>}

        <div className="container2">
          <center>
            <div className="Heading">Make A New Card</div>
          </center>
          <div className="AddcardFrom">
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Deck
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="DeckName"
                  placeholder="DeckName"
                  ref={deckNameRef}
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Front
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="Front"
                  placeholder="Front"
                  ref={frontRef}
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Back
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="Back"
                  placeholder="Back"
                  ref={backRef}
                />
              </div>
            </div>

            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Tags
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="Tags"
                  placeholder="One or Multiple"
                  ref={tagsRef}
                />
              </div>
            </div>

            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">Type:</legend>
              <div class="col-sm-10">
               

                <input
                  type="radio"
                  className="btn-check"
                  name="options-outlined"
                  id="success-outlined"
                  autocomplete="off"
                  checked
                />
                <label
                  className="b btn btn-outline-info"
                  for="success-outlined"
                  onClick={handleBasic}
                >
                  Basic
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="options-outlined"
                  id="danger-outlined"
                  autocomplete="off"
                />
                <label
                  className="b btn btn-outline-danger"
                  for="danger-outlined"
                  onClick={handleMcq}
                >
                  MCQ
                </label>
              </div>
            </fieldset>

            {mcq && (
              <div className="generateWithAI">
                <button className="generate-btn" onClick={handleGenerate}>
                  Generate with AI
                </button>
              </div>
            )}

            <button
              type="submit"
              class="AddCardButton btn btn-primary"
              onClick={handleSubmit}
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCard;
