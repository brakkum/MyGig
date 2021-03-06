using System;

namespace MyGigApi.DTOs
{
    public class MemberDto
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public string PhotoUrl { get; set; }

        public bool ConnectedToUser { get; set; }

        public DateTime? MemberSince { get; set; }

        public DateTime? ConfirmedAt { get; set; }
    }
}
