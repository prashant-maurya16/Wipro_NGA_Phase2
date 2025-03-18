using Microsoft.EntityFrameworkCore;

namespace HospitalProject.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Doctor> Doctor { get; set; }

        public DbSet<Patient> Patient { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
