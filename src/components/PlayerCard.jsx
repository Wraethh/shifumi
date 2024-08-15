import PropTypes from "prop-types";

function PlayerCard({ symbol, handleClick, animClass, gameStarted = false }) {
  return (
    <button
      type="button"
      className={`card ${animClass}`}
      disabled={gameStarted}
      onClick={() => handleClick(symbol)}
    >
      <img src={`/assets/${symbol}.svg`} alt={symbol} />
    </button>
  );
}

PlayerCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  animClass: PropTypes.string.isRequired,
  gameStarted: PropTypes.bool,
};

export default PlayerCard;
