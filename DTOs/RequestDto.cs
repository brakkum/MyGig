using System;

namespace MyGigApi.DTOs
{
    public class RequestDto
    {
        public int UserIdRequester { get; set; }

        public string UserPhoto { get; set; }

        public int UserIdRecipient { get; set; }

        public string Text { get; set; }

        public DateTime Timestamp { get; set; }

        public RequestType RequestType { get; set; }

        public int TypeId { get; set; }
    }

    public enum RequestType
    {
        Connection,
        EnsembleMember,
        EnsembleModerator,
        EventModerator,
        Booking
    }
}