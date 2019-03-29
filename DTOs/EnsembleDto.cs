using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class EnsembleDto
    {
        public string Name { get; set; }

        public int EnsembleId { get; set; }

        public bool IsMod { get; set; }

        public ICollection<MemberDto> Members { get; set; }

        public ICollection<EventDto> Events { get; set; }

        public ICollection<EnsembleCommentDto> Comments { get; set; }
    }
}
