using cms_api.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Customer_Project.Models
{
    public class EFCoreDbContext: DbContext
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
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Wallet>().ToTable("Wallet");
            modelBuilder.Entity<Menu>().ToTable("Menu");

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<Menu> Menu { get; set; }

    }
}
