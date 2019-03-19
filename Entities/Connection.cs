using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Connection
    {
        [Required]
        public int UserIdRequester { get; set; }

        [ForeignKey("UserIdRequester")]
        public User UserRequester { get; set; }

        [Required]
        public int UserIdRecipient { get; set; }

        [ForeignKey("UserIdRecipient")]
        public User UserRecipient { get; set; }

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
