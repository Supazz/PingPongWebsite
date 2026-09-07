
using PingPongBackend.Persons;

namespace PingPongBackend.Matches;
public class CreateMatchDTO
{
    public required Guid P1 { get; set; }
    public required Guid P2 { get; set; }

    public  MatchType Matchtype {get; set;} = MatchType.FiveGames;
    public required DateTime MatchTime { get; set; }

}
