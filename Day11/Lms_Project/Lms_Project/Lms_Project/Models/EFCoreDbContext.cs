using Microsoft.EntityFrameworkCore;
using Lms_Project.Models;
using lmsProject.Models;

namespace Lms_Project.Models
{
    public class EFCoreDbContext:DbContext
    {
        public EFCoreDbContext(DbContextOptions<EFCoreDbContext> options) : base(options)
        {
        }
        //OnConfiguring() method is used to select and configure the data source
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<LeaveHistory>().ToTable("LeaveHistory");
          

        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<LeaveHistory> LeaveHistory { get; set; } = default!;
       

    }
}
