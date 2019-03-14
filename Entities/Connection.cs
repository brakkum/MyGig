using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Connection
    {
        [Required]
        public int UserIdA { get; set; }

        [ForeignKey("UserIdA")]
        public User UserA { get; set; }

        [Required]
        public int UserIdB { get; set; }

        [ForeignKey("UserIdB")]
        public User UserB { get; set; }

        [Required]
        public ConnectionStatus Status { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }
    }

    public enum ConnectionStatus
    {
        Pending = 0,
        Accepted = 1,
        Declined = 2
    }
}