using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Request
    {
        [Required]
        public int UserIdRequester { get; set; }

        [ForeignKey("UserIdRequester")]
        public User UserRequester { get; set; }

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
