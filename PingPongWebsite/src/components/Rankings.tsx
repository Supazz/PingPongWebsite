import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { getPeople } from "../persons/persons.service";
import { getErrorMessage } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import type { Person } from "../persons/persons.model";
export function Rankings() {
  const navigate = useNavigate();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get all people after component is rendered
  useEffect(() => {
    void getPeople().then(setPeople)
      .catch((error) => setError(getErrorMessage(error)))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedPeople = [...people].sort((a, b) => {
    return b.elo - a.elo;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Ping Pong Rankings
        </h1>
        <p className="text-muted-foreground mt-1">
          Current club rankings based on Elo rating
        </p>
        </div>
        <Button type="button" onClick={() => navigate("/login")}>
          Log in
        </Button>
      </div>

      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden" aria-busy={isLoading}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center">Rank</TableHead>
              <TableHead className="text-center">Player</TableHead>
              <TableHead className="text-center">Elo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {people.length === 0 && (
              <TableRow><TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                {isLoading ? "Loading rankings…" : error ? "Rankings could not be loaded." : "No players have been added yet."}
              </TableCell></TableRow>
            )}
            {sortedPeople.map((person: Person, index: number) => {
              return (
                <TableRow
                  key={person.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-semibold text-center">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-center">{person.name}</div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-mono">
                      {person.elo}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
