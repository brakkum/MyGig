using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

namespace MyGigApi.Entities
{
    public class User
    {
        public User()
        {
            IsActive = true;
        }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("UserId")]
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }

        private string _password;

        [Required]
        public string Password
        {
            get => _password;
            // TODO: BCrypt
            set => _password = value;
        }

        [Required]
        public string Email { get; set; }

        // TODO: set default to true
        [Required]
        public bool IsActive { get; set; }

        [NotMapped] 
        public string FullName => $"{FirstName} {LastName}";
    }
}