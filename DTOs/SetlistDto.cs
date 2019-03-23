using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class SetlistDto
    {
        public int SetlistId { get; set; }

        public int EnsembleId { get; set; }

        public string Name { get; set; }

        public ICollection<SongDto> Songs { get; set; }

        public ICollection<SetlistCommentDto> SetlistComments { get; set; }
    }
}
