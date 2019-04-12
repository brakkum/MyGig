using System;
using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class EventDto
    {
        public int EventId { get; set; }
        public string Name { get; set; }

        public DateTime DateAndTime { get; set; }

        public string Location { get; set; }

        public bool UserIsMod { get; set; }

        public ICollection<EnsembleDto> Ensembles { get; set; }

        public ICollection<EventCommentDto> Comments { get; set; }
    }
}
