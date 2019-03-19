using System;

namespace MyGigApi.DTOs
{
    public class PrivateEventCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public UserDto User { get; set; }
    }
}
