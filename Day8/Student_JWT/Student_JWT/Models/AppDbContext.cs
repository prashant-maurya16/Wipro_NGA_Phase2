using Microsoft.EntityFrameworkCore;

namespace Student_JWT.Models
{
    public class AppDbContext: DbContext
    {
        public DbSet<Students> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
