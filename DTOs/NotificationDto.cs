using System;

namespace MyGigApi.DTOs
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }

        public string Url { get; set; }

        public string Text { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
