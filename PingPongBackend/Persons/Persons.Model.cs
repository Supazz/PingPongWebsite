namespace PingPongBackend.Persons;



public class Person
{
    public  Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email {get; set;}
    public int Elo { get; set; }




}
