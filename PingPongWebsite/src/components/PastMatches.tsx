import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash2, Trophy } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Match } from "../Matches/matches.model";
import { deleteMatch, getMatches } from "../Matches/matches.service";
import type { Person } from "../persons/persons.model";
import { getPeople } from "../persons/persons.service";

function completedMatches(matches: Match[]) {
  return matches
    .filter((match) => match.winner === 1 || match.winner === 2)
    .sort((a, b) => (Date.parse(b.matchTime) || 0) - (Date.parse(a.matchTime) || 0));
}

export function PastMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [matchesFromApi, peopleFromApi] = await Promise.all([getMatches(), getPeople()]);
        if (!cancelled) {
          setMatches(completedMatches(matchesFromApi));
          setPeople(peopleFromApi);
        }
      } catch {
        if (!cancelled) setError("Unable to load past matches. Please reload the page to try again.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(null);
    try {
      await deleteMatch(id);
    } catch {
      setError("Unable to delete the match. Please try again.");
      setDeletingId(null);
      return;
    }
    try {
      setMatches(completedMatches(await getMatches()));
    } catch {
      setError("The match was deleted, but the list could not refresh. Please reload the page.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Past Matches</h1>
          <p className="mt-1 text-muted-foreground">Review completed matches and their winners.</p>
        </div>
        <Button type="button" onClick={() => navigate("/admin")}>Admin</Button>
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm" aria-busy={isLoading}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Player 1</TableHead>
              <TableHead>Player 2</TableHead>
              <TableHead>Scheduled time</TableHead>
              <TableHead>Winner</TableHead>
              <TableHead className="w-20 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => {
              const player1 = people.find((person) => person.id === match.p1)?.name ?? "Player not found";
              const player2 = people.find((person) => person.id === match.p2)?.name ?? "Player not found";
              const date = new Date(match.matchTime);
              return (
                <TableRow key={match.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{player1}</TableCell>
                  <TableCell>{player2}</TableCell>
                  <TableCell className="text-muted-foreground">{Number.isNaN(date.getTime()) ? "No time supplied" : format(date, "PP p")}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                      <Trophy className="size-4" aria-hidden="true" />
                      {match.winner === 1 ? player1 : player2}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button type="button" variant="ghost" size="icon" disabled={deletingId !== null}
                      aria-label={`Delete past match between ${player1} and ${player2}`}
                      onClick={() => void handleDelete(match.id)}>
                      <Trash2 className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {matches.length === 0 && (
              <TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                {isLoading ? "Loading past matches…" : error ? "Past matches could not be loaded." : "No completed matches yet."}
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

