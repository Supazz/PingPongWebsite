import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash2, Swords, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateMatch } from "./CreateMatch";
import type { Match } from "../Matches/matches.model";
import { deleteMatch, getMatches } from "../Matches/matches.service";
import type { Person } from "../persons/persons.model";
import { getPeople } from "../persons/persons.service";
import { RefMatch } from "./RefMatch";

export function ManageMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [isCreateMatchOpen, setIsCreateMatchOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const navigate = useNavigate();

  const loadPeople = async () => {
    const peopleFromApi = await getPeople();
    setPeople(peopleFromApi);
  };

  const loadMatches = async () => {
    const matchesFromApi = await getMatches();
    const matchesByTime = [...matchesFromApi].sort(
      (a, b) =>
        new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime(),
    );
    setMatches(matchesByTime);
  };

  useEffect(() => {
    void loadPeople();
    void loadMatches();
  }, []);

  const displayMatchTime = (matchTime: string) => {
    const date = new Date(matchTime);
    return Number.isNaN(date.getTime())
      ? "No time supplied"
      : format(date, "PP p");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Matches</h1>
          <p className="mt-1 text-muted-foreground">
            Schedule matches, enter scores, or manage the calendar.
          </p>
        </div>

        <Button type="button" onClick={() => navigate("/Admin")}>
          Admin
        </Button>

        <Button type="button" onClick={() => setIsCreateMatchOpen(true)}>
          <Swords />
          Create match
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Player 1</TableHead>
              <TableHead>Player 2</TableHead>
              <TableHead>Scheduled time</TableHead>
              <TableHead className="w-44 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {matches.map((match) => {
              const player1 = people.find((person) => person.id === match.p1);
              const player2 = people.find((person) => person.id === match.p2);

              return (
                <TableRow key={match.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {player1?.name ?? "Player not found"}
                  </TableCell>
                  <TableCell>{player2?.name ?? "Player not found"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {displayMatchTime(match.matchTime)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-end gap-2">
                    <Button type="button" variant="outline" size="sm"
                      className="gap-2 bg-card text-primary"
                      aria-label={`Ref match between ${player1?.name ?? "unknown player"} and ${player2?.name ?? "unknown player"}`}
                      onClick={() => setSelectedMatch(match)}>
                      <ClipboardList />
                      Ref match
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete match between ${player1?.name ?? "unknown player"} and ${player2?.name ?? "unknown player"}`}
                      onClick={async () => {
                        await deleteMatch(match.id);
                        await loadMatches();
                      }}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {matches.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No matches have been scheduled yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isCreateMatchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-card shadow-lg">
            <button
              type="button"
              onClick={() => setIsCreateMatchOpen(false)}
              className="absolute right-4 top-4 z-10"
              aria-label="Close create-match form"
            >
              ×
            </button>
            <CreateMatch
              onSuccess={async () => {
                await loadMatches();
                setIsCreateMatchOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ref-match-title"
            className="relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-card text-card-foreground shadow-lg">
          <RefMatch key={selectedMatch.id}
            player1Name={people.find((person) => person.id === selectedMatch.p1)?.name ?? "Player 1"}
            player2Name={people.find((person) => person.id === selectedMatch.p2)?.name ?? "Player 2"}
            scheduledTime={displayMatchTime(selectedMatch.matchTime)}
            onClose={() => setSelectedMatch(null)}
          />
          </div>
        </div>
      )}
    </div>
  );
}
