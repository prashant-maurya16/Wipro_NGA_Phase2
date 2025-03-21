﻿using System.ComponentModel.DataAnnotations;

namespace lmsProject.Models
{
    public class LeaveHistory
    {
        [Key]
        public int? LeaveId { get; set; }
        public int? EmpId { get; set; }
        public DateTime LeaveStartDate { get; set; }
        public DateTime LeaveEndDate { get; set; }
        public int? noOfDays { get; set; }

        public string? LeaveStatus { get; set; }

        public string? LeaveReason { get; set; }

        public string? ManagerComments { get; set; }

    }
}