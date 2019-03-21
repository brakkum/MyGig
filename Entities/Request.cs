using System;

namespace MyGigApi.Entities
{
    public class Request
    {
        public RequestStatus Status { get; set; }

        public DateTime Timestamp { get; set; }
    }

    public enum RequestStatus
    {
        Pending = 0,
        Accepted = 1,
        Denied = 2,
        Inactive = 3
    }
}
