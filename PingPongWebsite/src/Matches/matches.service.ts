import { API_BASE_URL } from "../api";
import type { Match, NewMatchDTO, NewMatchGameDTO, ScoreMatchDTO } from "./matches.model";

export const createMatch = async (newMatch: NewMatchDTO) => {
  const url = `${API_BASE_URL}/api/Matches`;
  const requestBody = {
    p1: newMatch.p1,
    p2: newMatch.p2,
    matchTime: newMatch.date,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Unable to create the match. Please try again.");
  }

  const responseData: Match = await response.json();
  return responseData;
};

export const getMatches = async () => {
  const url = `${API_BASE_URL}/api/Matches`;
  const response = await fetch(url);
  const responseData: Match[] = await response.json();
  return responseData;
};

export const deleteMatch = async (id: string) => {
  const url = `${API_BASE_URL}/api/Matches/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete the match. Please try again.");
  }
};

export const scoreMatch = async (
  matchId: string,
  result: ScoreMatchDTO,

) => {
  const url = `${API_BASE_URL}/api/Matches/${matchId}/result`;
  const response = await fetch(url, {
    method: "Patch",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if(!response.ok){
    const message = await response.text();
    throw new Error(message || "Unable to save match scores");
  }
};
