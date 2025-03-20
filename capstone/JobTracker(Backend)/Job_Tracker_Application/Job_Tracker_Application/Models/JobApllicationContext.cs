using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Job_Tracker_Application.Models
{
    public class JobApllicationContext:DbContext
    {
        public JobApllicationContext(DbContextOptions<JobApllicationContext> options) : base(options) { }

        public DbSet<JobSeeker> JobSeeker { get; set; }
        public DbSet<JobPosters> JobPosters { get; set; }
        public DbSet<JobPortal> JobPortal { get; set; }
        public DbSet<ApplyJob> ApplyJob { get; set; }


       

    }
}
