export type NewMatchDTO = {
  p1: string;
  p2: string;
  date: string;
};
export type Match = {
  id: string;
  p1: string;
  p2: string;
  matchTime: string;
  winner: 0 | 1 | 2;
};
export type NewMatchGameDTO = {
  gameNumber: number;
  p1Score: number;
  p2Score: number;
}

export type MatchGame = {
  id: string;
  matchId: string;
  match: Match;
  gameNumber: number;
  p1Score: number; 
  p2Score: number;
}

export type ScoreMatchDTO = {
  
  matchType : 3 |5,
  games : NewMatchGameDTO[],
}
