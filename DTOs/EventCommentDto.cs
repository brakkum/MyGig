using System;

namespace MyGigApi.DTOs
{
    public class EventCommentDto
    {
        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        // Event Id
        public int EventId { get; set; }

        public MemberDto User { get; set; }
    }
}
