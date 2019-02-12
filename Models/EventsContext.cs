using Lesson9.Models;
using Microsoft.EntityFrameworkCore;

namespace AureliaDotnetTemplate.Models
{
    public class EventsContext : DbContext
    {
        public DbSet<MyEvent> MyEvents { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Job> Jobs { get; set; }

        public EventsContext(DbContextOptions<EventsContext> options) : base(options) { }

        public EventsContext() { }

    }
}