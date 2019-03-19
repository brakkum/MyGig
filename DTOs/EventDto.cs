using System;
using System.Collections.Generic;

namespace MyGigApi.DTOs
{
    public class EventDto
    {
        public string Name { get; set; }

        public DateTime DateAndTime { get; set; }

        public string Locations { get; set; }

        public ICollection<EnsembleDto> Ensembles { get; set; }
    }
}
