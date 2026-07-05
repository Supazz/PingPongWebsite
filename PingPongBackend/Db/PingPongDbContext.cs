namespace PingPongBackend.Db;

using Microsoft.EntityFrameworkCore;
using PingPongBackend.Persons;
using System;
using System.Collections.Generic;

public class PingPongDbContext : DbContext
{
    public DbSet<Person> Persons {get; set;}
    
    public string DbPath{get;}

    public PingPongDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "ping_pong.db");

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite($"Data Source={DbPath}");


}

