using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Connection
    {
//        [Key]
//        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public int ConnectionId { get; set; }

        [Required]
        public int UserIdRequester { get; set; }

        public User UserA { get; set; }

        [Required]
        public int UserIdRecipient { get; set; }

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