using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    [NotMapped]
    public class Login
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}