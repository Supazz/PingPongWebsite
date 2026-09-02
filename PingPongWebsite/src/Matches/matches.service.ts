import type { Match, NewMatchDTO } from "./Matches.model";

export const createMatch = async (newMatch: NewMatchDTO) => {
  const url = "http://localhost:5167/api/Matches";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMatch),
  });
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
  const url = "http://localhost:5167/api/Matches";
  const response = await fetch(url, {
    method: "Delete",
  });
};
