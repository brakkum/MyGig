using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int UserId { get; set; }

        [Required] public string FirstName { get; set; }

        [Required] public string LastName { get; set; }

        private string _password;

        [Required]
        public string Password
        {
            get => _password;
            set => _password = BCrypt.Net.BCrypt.HashPassword(value);
        }

        [Required]
        [NotMapped]
        public string PasswordConfirm { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool IsActive { get; set; }

//        public int UserPhotoId { get; set; }
//
//        [ForeignKey("UserPhotoId")]
//        public UserPhoto UserPhoto { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
    }
}