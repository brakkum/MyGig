using System;

namespace MyGigApi.DTOs
{
    public class RequestDto
    {
        public int RequestId { get; set; }

        public int UserIdRequester { get; set; }

        public string UserPhoto { get; set; }

        public int UserIdRecipient { get; set; }

        public string Text { get; set; }

        public DateTime Timestamp { get; set; }
    }
}