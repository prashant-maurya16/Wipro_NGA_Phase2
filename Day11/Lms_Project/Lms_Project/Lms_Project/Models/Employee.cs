using System.ComponentModel.DataAnnotations;

namespace lmsProject.Models
{


    public class Employee
    {
        [Key]
        public int? EmpId { get; set; }
        public string? EmployName { get; set; }
        public int? MgrId { get; set; }

        public int LeaveAvail { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        public string? Mobile { get; set; }
    }
}