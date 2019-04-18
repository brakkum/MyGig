using System;
using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class EnsembleDto
    {
        public string Name { get; set; }

        public int EnsembleId { get; set; }

        public bool UserIsMod { get; set; }

        public int BookingId { get; set; }

        public DateTime ?ConfirmedAt { get; set; }

        public ICollection<MemberDto> Members { get; set; }

        public ICollection<EnsembleBookingDto> Performances { get; set; }

        public ICollection<EnsembleCommentDto> Comments { get; set; }
    }
}
