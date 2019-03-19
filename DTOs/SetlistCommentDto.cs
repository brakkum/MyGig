using System;

namespace MyGigApi.DTOs
{
    public class SetlistCommentDto
    {
        public string Text { get; set; }

        public DateTime Timestamp { get; set; }

        public UserDto User { get; set; }
    }
}