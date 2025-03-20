using System.ComponentModel.DataAnnotations;

namespace Job_Tracker_Application.Models
{
    public class JobSeeker
    {

        [Key]
        public int JobSeekerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Domain { get; set; }
        public string? Qualification { get; set; }
        public string? Email { get; set; }
        public string? Mobile { get; set; }

    }
}
