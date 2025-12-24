import Match from './match';

export function Matches({ matches }: { matches: any }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {matches.map((match: any) => (
        <Match key={match._id} match={match} />
      ))}
    </div>
  );
}