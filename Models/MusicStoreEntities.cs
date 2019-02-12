using Microsoft.EntityFrameworkCore;

namespace AureliaDotnetTemplate.Models
{
    public class MusicStoreEntities : DbContext
    {
        public DbSet<Album> Albums { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Artist> Artists { get; set; }

        public MusicStoreEntities(DbContextOptions<MusicStoreEntities> options) : base(options) { }

        //public MusicStoreEntities() { }
    }
}