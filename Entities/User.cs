using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MyGigApi.Entities
{
    public class User
    {
        public User()
        {
            IsActive = true;
        }

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
        [MinLength(6)]
        [MaxLength(50)]
        public string Password
        {
            get => _password;
            set => _password = BCrypt.Net.BCrypt.HashPassword(value);
        }

        [Required]
        [NotMapped]
        [MinLength(6)]
        [MaxLength(50)]
        public string PasswordConfirm { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public int? UserPhotoId { get; set; }

        [ForeignKey("UserPhotoId")]
        public UserPhoto UserPhoto { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<EnsembleMember> Ensembles { get; set; }

        public ICollection<EventModerator> EventsModerated { get; set; }

        public ICollection<EnsembleModerator> EnsemblesModerated { get; set; }

        private ICollection<Connection> ConPoolA { get; set; }

        private ICollection<Connection> ConPoolB { get; set; }

        [NotMapped]
        public IEnumerable<Connection> Connections => ConPoolA.Concat(ConPoolB).Distinct();
    }
}