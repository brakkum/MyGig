using System;

namespace MyGigApi.DTOs
{
    public class SetlistDto
    {
//        public int SetlistId { get; set; }
//
//        public int EnsembleId { get; set; }
//
//        public string Name { get; set; }
//
//        public ICollection<SongDto> Songs { get; set; }
//
//        public ICollection<SetlistCommentDto> SetlistComments { get; set; }
        public string EventName { get; set; }

        public string EventLocation { get; set; }

        public string EnsembleName { get; set; }

        public DateTime DateAndTime { get; set; }

        public string Setlist { get; set; }
    }
}
