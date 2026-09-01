import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Users, Swords } from "lucide-react";

export function Admin() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Admin</h1>
      <p className="mt-3 text-muted-foreground">
        Manage players and matches for the club.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Button
          variant="outline"
          onClick={() => navigate("/manage-players")}
          className="h-auto flex-col items-center gap-3 whitespace-normal rounded-xl p-8 text-center"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="size-5" />
          </span>
          <span className="font-semibold">Manage Players</span>
          <span className="text-sm font-normal text-muted-foreground">
            Add or remove players from the club.
          </span>
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/manage-matches")}
          className="h-auto flex-col items-center gap-3 whitespace-normal rounded-xl p-8 text-center"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Swords className="size-5" />
          </span>
          <span className="font-semibold">Manage Matches</span>
          <span className="text-sm font-normal text-muted-foreground">
            Record results and review match history.
          </span>
        </Button>
      </div>
    </div>
  );
}
