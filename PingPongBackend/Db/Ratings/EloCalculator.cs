public static class EloCalculator
{
    public static (int Player1, int Player2) Calculate(Winner winner, int p1Elo, int p2Elo)
    {
        if (winner != Winner.P1 && winner != Winner.P2)
            throw new ArgumentOutOfRangeException(nameof(winner), "A decided winner is required.");

        // Use long for subtraction so even extreme integer ratings are safe.
        long difference = Math.Abs((long)p1Elo - p2Elo);
        bool higherRatedWins = winner == Winner.P1 ? p1Elo >= p2Elo : p2Elo >= p1Elo;
        int points;

        if (difference <= 12)
            points = 8;
        else if (difference <= 37)
            points = higherRatedWins ? 7 : 10;
        else if (difference <= 62)
            points = higherRatedWins ? 6 : 13;
        else if (difference <= 87)
            points = higherRatedWins ? 5 : 16;
        else if (difference <= 112)
            points = higherRatedWins ? 4 : 20;
        else if (difference <= 137)
            points = higherRatedWins ? 3 : 25;
        else if (difference <= 162)
            points = higherRatedWins ? 2 : 30;
        else if (difference <= 187)
            points = higherRatedWins ? 2 : 35;
        else if (difference <= 212)
            points = higherRatedWins ? 1 : 40;
        else if (difference <= 237)
            points = higherRatedWins ? 1 : 45;
        else
            points = higherRatedWins ? 0 : 50;

        // The winner gains exactly the number of points the loser loses.
        // No rating floor is applied because the supplied rules specify none.
        return winner == Winner.P1
            ? (checked(p1Elo + points), checked(p2Elo - points))
            : (checked(p1Elo - points), checked(p2Elo + points));
    }
}
