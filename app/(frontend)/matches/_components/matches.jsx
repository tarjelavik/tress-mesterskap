import PropTypes from 'prop-types';
import Match from './match';

export function Matches({ matches }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {matches.map((match) => (
        <Match key={match._id} match={match} />
      ))}
    </div>
  );
}

Matches.propTypes = {
  matches: PropTypes.array.isRequired,
};
