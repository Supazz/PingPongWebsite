
using PingPongBackend.Persons;
using SQLitePCL;

public class Match
{
    public required Guid Id { get; set; }
    public required Guid P1 { get; set; }
    public required Guid P2 { get; set; }
    public required DateTime MatchTime { get; set; }
    public MatchType MatchType {get; set;} = MatchType.FiveGames;
    
    public Winner Winner {get; set;} = Winner.Undecided;

    public List<MatchGame> Games {get; set;} = [];
}
