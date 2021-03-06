using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MyGigApi.Entities
{
    public class User
    {
        [Key]
        [Column("UserId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(20)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(20)]
        public string LastName { get; set; }

        private string _password;

        [Required]
        public string Password
        {
            get => _password;
            set => _password = BCrypt.Net.BCrypt.HashPassword(value);
        }

        [Required]
        [NotMapped]
        [MinLength(1)]
        [MaxLength(50)]
        public string PasswordConfirm { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        public string PhotoUrl { get; set; }

        public UserStatus Status { get; set; }

        public DateTime JoinedOn { get; set; }
    }

    public enum UserStatus
    {
        Inactive = 0,
        Active = 1
    }
}
