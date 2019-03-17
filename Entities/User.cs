using System.Collections;
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
        [MinLength(6)]
        [MaxLength(50)]
        public string PasswordConfirm { get; set; }

        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        public int? UserPhotoId { get; set; }

        [ForeignKey("UserPhotoId")]
        public UserPhoto UserPhoto { get; set; }

        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<EnsembleMember> Ensembles { get; set; }

        public ICollection<EventModerator> EventsModerated { get; set; }

        public ICollection<EnsembleModerator> EnsemblesModerated { get; set; }

        public ICollection<Connection> ConnectionsByUser { get; set; }

        public ICollection<Connection> ConnectionsByOther { get; set; }

        [NotMapped]
        public IEnumerable<Connection> Connections
        {
            get
            {
                return ConnectionsByUser?.Concat(ConnectionsByOther)
                    .Where(c => c.Status == ConnectionStatus.Accepted);
            }
        }

        [NotMapped]
        public IEnumerable<Connection> PendingConnections
        {
            get
            {
                return ConnectionsByOther?.Where(c => c.Status == ConnectionStatus.Pending);
            }
        }

        public UserStatus Status { get; set; }
    }

    public enum UserStatus
    {
        Inactive = 0,
        Active = 1
    }
}
