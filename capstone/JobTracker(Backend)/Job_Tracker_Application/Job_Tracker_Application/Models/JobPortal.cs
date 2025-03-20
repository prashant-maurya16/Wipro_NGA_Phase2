using System.ComponentModel.DataAnnotations;

namespace Job_Tracker_Application.Models
{
    public class JobPortal
    {


        [Key]
        public int PortalId { get; set; }
        public string? PortalName { get; set; }
        public string? JobName { get; set; }
        public int? CompanyId { get; set; }
        public string? JobDescription { get; set; }
        public int? Position { get; set; }
        public DateTime? PublishedOn { get; set; }
        public string? Status { get; set; }
        public string? EndComments { get; set; }

    }
}


