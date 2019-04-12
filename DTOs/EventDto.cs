using System;
using System.Collections.Generic;
using System.Linq;

namespace MyGigApi.DTOs
{
    public class EventDto
    {
        public int EventId { get; set; }
        public string Name { get; set; }

        public DateTime DateAndTime { get; set; }

        public string Location { get; set; }

        public bool UserIsMod { get; set; }

        public int BookingId { get; set; }

        public string Setlist { get; set; }

        public ICollection<EnsembleDto> Ensembles { get; set; }

        public ICollection<EventCommentDto> Comments { get; set; }
    }
}
