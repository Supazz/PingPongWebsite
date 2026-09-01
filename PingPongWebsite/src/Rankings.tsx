import { Badge } from "@/components/ui/badge";
import { getPeople } from "./persons/persons.service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import type { Person } from "./persons/persons.model";
export function Rankings() {
  const [people, setPeople] = useState<Person[]>([]);

  // Get all people after component is rendered
  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const sortedPeople = [...people].sort((a, b) => {
    return b.elo - a.elo;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Ping Pong Rankings
        </h1>
        <p className="text-muted-foreground mt-1">
          Current club rankings based on Elo rating
        </p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center">Rank</TableHead>
              <TableHead className="text-center">Player</TableHead>
              <TableHead className="text-center">Elo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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
