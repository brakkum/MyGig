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
        public string DisplayMessage { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }
    }
}