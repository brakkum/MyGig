using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Booking
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }

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

        // Unique to Booking below
        public int EventId { get; set; }

        public Event Event { get; set; }

        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }
    }
}
