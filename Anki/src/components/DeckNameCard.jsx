import { Link } from "react-router-dom";

const DeckNameCard=({name})=>{


  return (
    <>
      <div className="deckNameCard">
        <div className="deckNamedisplay">
          <Link to="/" className='DName'>
          {name}
          </Link>
        </div>
        <div className="deckCardAction">
          Action
        </div>
      </div>
    </>
  )
}


export default DeckNameCard;