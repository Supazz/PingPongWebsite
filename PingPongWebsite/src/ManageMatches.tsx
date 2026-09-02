import type { Match } from "./Matches/matches.model";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getMatches } from "./Matches/matches.service";

export function ManageMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isCreateMatchOpen, setIsCreateMatchOpen] = useState(false);
  const navigate = useNavigate();

  const loadMatches = async () => {
    const matchesFromApi = await getMatches();
    setMatches(matchesFromApi); //Here I can sort the matches later
  };
  return <></>;
}
