using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EventModerator
    {
        [Required]
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime AssignedAt { get; set; }

        public EventModeratorStatus Status { get; set; }
    }

    public enum EventModeratorStatus
    {
        Pending = 0,
        Active = 1,
        Declined = 2,
        Inactive = 3
    }
}