
using PingPongBackend.Persons;

public class Match()
{
    public required Guid Id { get; set; }
    public required Guid P1 { get; set; }
    public required Guid P2 { get; set; }
    public required DateTime MatchTime { get; set; }
}
