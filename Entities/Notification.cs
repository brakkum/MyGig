using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Notification
    {
        [Required]
        [MaxLength(100)]
        [Key]
        public string Url { get; set; }

        [Required]
        public string DisplayMessage { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        // TODO: add User field as key
    }
}