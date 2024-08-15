import PropTypes from "prop-types";

function EnemyCard({ symbol, animClass }) {
  return (
    <div className={`enemy-card ${animClass}`}>
      <div className="enemy-card-front">
        <img src={`/assets/${symbol}.svg`} alt={symbol} />
      </div>
      <div className="enemy-card-back">?</div>
    </div>
  );
}

EnemyCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  animClass: PropTypes.string.isRequired,
};

export default EnemyCard;
