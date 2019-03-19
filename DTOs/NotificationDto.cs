using System;

namespace MyGigApi.DTOs
{
    public class NotificationDto
    {
        public string Url { get; set; }

        public string DisplayMessage { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
