using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace MyGigApi.DTOs
{
    public class EnsembleDto
    {
        public string Name { get; set; }

        public int EnsembleId { get; set; }

        public ICollection<MemberDto> Members { get; set; }

        public ICollection<EventDto> Events { get; set; }

        public ICollection<EnsembleCommentDto> Comments { get; set; }
    }
}
