using System.ComponentModel.DataAnnotations;

namespace Job_Tracker_Application.Models
{
    public class JobPosters
    {

        [Key]
        public int CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHashed { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
      
    }
}
