using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cms_api.Models
{
    public class Wallet
    {
        [Key]
        public int walletId { get; set; }

      
        public int custId { get; set; }

 
      
        public string walletType { get; set; }

  
     
        public decimal walletAmount { get; set; }
    }
}