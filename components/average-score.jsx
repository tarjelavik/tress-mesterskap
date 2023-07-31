import { getPlayerAverageScore } from "../lib/functions";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function AverageScore({ player, games }) {
  return (

    <Card className=''>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Gjennomsnitt over {games.length} slag
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {getPlayerAverageScore(player, games)}
        </div>
      </CardContent>
    </Card>
  );
}