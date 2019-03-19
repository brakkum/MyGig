using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class SongDto
    {
        public int SongId { get; set; }

        public string Name { get; set; }

        public string YouTubeUrl { get; set; }

        public string PdfUrl { get; set; }

        public int SetlistPosition { get; set; }

        public ICollection<SongCommentDto> SongComments { get; set; }
    }
}
