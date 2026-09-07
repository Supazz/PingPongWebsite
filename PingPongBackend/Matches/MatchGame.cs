public class MatchGame
{
    public required Guid Id {get; set;}
    public required Guid MatchId{get;set;}  
    public required Match Match{get; set;}
    public required int GameNumber{get; set;}
    public required int P1Score{get; set;}
    public required int P2Score {get; set;}
}