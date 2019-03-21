using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Notification
    {
        [Required]
        [MaxLength(100)]
        public string Url { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        [MaxLength(100)]
        public string Text { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        public NotificationStatus Status { get; set; }
    }

    public enum NotificationStatus
    {
        Unseen = 0,
        Seen = 1
    }
}
