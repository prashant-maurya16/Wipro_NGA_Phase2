using System.ComponentModel.DataAnnotations;

namespace Customer_Project.Models
{
    public class Menu
    {
        [Key]
        public int menuId { get; set; }


        public string ItemName { get; set; }



        public string ItemType { get; set; }




        public decimal Price{ get; set; }
        public string Description { get; set; }
        public string rating { get; set; }


    }
}
