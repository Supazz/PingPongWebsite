public class MatchGameDTO
{

    public required int GameNumber { get; set; }
    public required int P1Score { get; set; }
    public required int P2Score { get; set; }
}

public class ScoreMatchDTO
{
    public required MatchType MatchType { get; set; }
    public required List<MatchGameDTO> Games { get; set; }
}
