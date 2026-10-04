import { useEffect, useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { getErrorMessage } from "../api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Person } from "../persons/persons.model";
import { deletePerson, getPeople } from "../persons/persons.service";
import { CreatePlayer } from "./CreatePlayer";
import { useNavigate } from "react-router";

export function ManagePlayers() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isCreatePlayerOpen, setIsCreatePlayerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadPeople = async () => {
    const peopleFromApi = await getPeople();
    const alphabetizedPeople = [...peopleFromApi].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );

    setPeople(alphabetizedPeople);
  };
  useEffect(() => {
    void loadPeople()
      .catch((error) => setError(getErrorMessage(error)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Players</h1>
          <p className="mt-1 text-muted-foreground">
            Add players or remove players from the club.
          </p>
        </div>

        <Button type="button" onClick={() => navigate("/Admin")}>
          Admin
        </Button>

        <Button
          type="button"
          onClick={() => {
            setIsCreatePlayerOpen(true);
          }}
        >
          <UserPlus />
          Add player
        </Button>
      </div>

      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm" aria-busy={isLoading}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Player</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Elo</TableHead>
              <TableHead className="w-20 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {person.email}
                </TableCell>
                <TableCell className="text-center font-mono">
                  {person.elo}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${person.name}`}
                    disabled={deletingId !== null}
                    onClick={async () => {
                      if (deletingId !== null) return;
                      setError(null);
                      setDeletingId(person.id);
                      try {
                        await deletePerson(person.id);
                      } catch (error) {
                        setError(getErrorMessage(error));
                        setDeletingId(null);
                        return;
                      }
                      setPeople((current) => current.filter((player) => player.id !== person.id));
                      try {
                        await loadPeople();
                      } catch {
                        setError("The player was deleted, but the list could not refresh. Please reload the page.");
                      } finally {
                        setDeletingId(null);
                      }
                    }}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {people.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  {isLoading ? "Loading players…" : error ? "Unable to display players." : "No players have been added yet."}
                </TableCell>
              </TableRow>
            )}
            {isCreatePlayerOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="relative w-full max-w-md rounded-xl bg-card p-6 shadow-lg">
                  <button
                    type="button"
                    onClick={() => setIsCreatePlayerOpen(false)}
                    className="absolute right-4 top-4"
                    aria-label="Close create-player form"
                  >
                    ×
                  </button>
                  <CreatePlayer
                    onSuccess={async () => {
                      setIsCreatePlayerOpen(false);
                      try {
                        await loadPeople();
                        setError(null);
                      } catch {
                        setError("The player was created, but the list could not refresh. Please reload the page.");
                      }
                    }}
                  ></CreatePlayer>
                </div>
              </div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
