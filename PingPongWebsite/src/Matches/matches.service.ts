import type { Match, NewMatchDTO } from "./matches.model";

export const createMatch = async (newMatch: NewMatchDTO) => {
  const url = "http://localhost:5167/api/Matches";
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
  const url = "http://localhost:5167/api/Matches";
  const response = await fetch(url);
  const responseData: Match[] = await response.json();
  return responseData;
};

export const deleteMatch = async (id: string) => {
  const url = `http://localhost:5167/api/Matches/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete the match. Please try again.");
  }
};
