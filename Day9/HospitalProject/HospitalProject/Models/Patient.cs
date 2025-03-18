using System.ComponentModel.DataAnnotations;

namespace HospitalProject.Models
{
    public class Patient
    {
        [Key]

        public int PatientId { get; set; }
        public string? PatientName { get; set; }
        public string? HealthProblem { get; set; }
        public int DoctorId { get; set; }
        public string? Email { get; set; }
        public string? MobileNo { get; set; }
        public int Age { get; set; }
        
    }
}
