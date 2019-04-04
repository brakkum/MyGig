using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EventModerator
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventModeratorId { get; set; }

        [Required]
        public int UserIdRequester { get; set; }

        [ForeignKey("UserIdRequester")]
        public User UserRequester { get; set; }

        [Required]
        public int UserIdRecipient { get; set; }

        [ForeignKey("UserIdRecipient")]
        public User UserRecipient { get; set; }

        public RequestStatus Status { get; set; }

        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public DateTime? ConfirmedAt { get; set; }

        // Unique to EventModerator below
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }
    }
}