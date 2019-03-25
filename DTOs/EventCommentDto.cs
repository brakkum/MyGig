using System;

namespace MyGigApi.DTOs
{
    public class EventCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public int EventId { get; set; }

        public UserDto User { get; set; }
    }
}
