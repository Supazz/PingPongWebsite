import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { Trophy, Users, Swords, History } from "lucide-react";
import { useState } from "react";
import { logout } from "../auth/login.service";
import { getErrorMessage } from "../api";
import { useAuth } from "../auth/useAuth";

export function Admin() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {clearUser} = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Admin</h1>
      <p className="mt-3 text-muted-foreground">
        Manage players and matches for the club.
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-6"
        disabled={isLoggingOut}
        onClick={async () => {
          if (isLoggingOut) return;
          setError(null);
          setIsLoggingOut(true);
          try {
            await logout();
            clearUser();
            navigate("/", { replace: true });
          } catch (error) {
            setError(getErrorMessage(error));
          } finally {
            setIsLoggingOut(false);
          }
        }}
      >
        {isLoggingOut ? "Logging out…" : "Log out"}
      </Button>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Button
          variant="outline"
          render={<Link to="/manage-players" />}
          nativeButton={false}
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
          render={<Link to="/manage-matches" />}
          nativeButton={false}
          className="h-auto flex-col items-center gap-3 whitespace-normal rounded-xl p-8 text-center"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Swords className="size-5" />
          </span>
          <span className="font-semibold">Manage Matches</span>
          <span className="text-sm font-normal text-muted-foreground">
            Schedule matches and record results.
          </span>
        </Button>

        <Button
          variant="outline"
          render={<Link to="/past-matches" />}
          nativeButton={false}
          className="h-auto flex-col items-center gap-3 whitespace-normal rounded-xl p-8 text-center"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <History className="size-5" />
          </span>
          <span className="font-semibold">Past Matches</span>
          <span className="text-sm font-normal text-muted-foreground">
            Review winners and manage completed matches.
          </span>
        </Button>

        <Button
          variant="outline"
          render={<Link to="/" />}
          nativeButton={false}
          className="h-auto flex-col items-center gap-3 whitespace-normal rounded-xl p-8 text-center"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Trophy className="size-5" />
          </span>
          <span className="font-semibold">View Rankings</span>
          <span className="text-sm font-normal text-muted-foreground">
            See the current player rankings.
          </span>
        </Button>
      </div>
    </div>
  );
}
