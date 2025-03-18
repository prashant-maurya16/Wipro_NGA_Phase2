using System.ComponentModel.DataAnnotations;

namespace Customer_Project.Models
{
    public class Customer
    {
        [Key]

        public int CustId { get; set; }
            public string? custName { get; set; }
        public string? custUserName{ get; set; }
        public string? custPassword { get; set; }
        public string? city { get; set; }
        public string? state { get; set; }
        public string? email { get; set; }
        public string? mobileNo { get; set; }

    }
}
