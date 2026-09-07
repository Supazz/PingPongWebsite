namespace PingPongBackend.Db;

using Microsoft.EntityFrameworkCore;
using PingPongBackend.Persons;
using System;
using System.Collections.Generic;

public class PingPongDbContext : DbContext
{
    public DbSet<Person> Persons { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<MatchGame> MatchGames {get; set;}

    public string DbPath { get; }

    public PingPongDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "ping_pong.db");

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite($"Data Source={DbPath}");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Person>().HasKey(person => person.Id);
        modelBuilder.Entity<Match>().HasKey(match => match.Id);
        modelBuilder.Entity<MatchGame>().HasKey(game => game.Id);

        modelBuilder.Entity<MatchGame>()
            .HasIndex(game => new { game.MatchId, game.GameNumber })
            .IsUnique();
    }

}

