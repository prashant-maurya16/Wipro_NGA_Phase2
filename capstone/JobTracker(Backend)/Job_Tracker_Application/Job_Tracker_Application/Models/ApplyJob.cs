using System.ComponentModel.DataAnnotations;

namespace Job_Tracker_Application.Models
{
    public class ApplyJob
    {


        [Key]

        public int JobAppId { get; set; }
        public int ? JobSeekerId { get; set; }

        public int? PortalId { get; set; }
        public DateTime AppliedOn { get; set; }
        public string? Status { get; set; }
     

    }
}

