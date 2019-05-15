using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Notification
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationId { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public string Url { get; set; }

        public NotificationStatus Status { get; set; }

        public DateTime Timestamp { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }

    public enum NotificationStatus
    {
        Unseen = 0,
        Seen = 1
    }
}