using System;

namespace MyGigApi.DTOs
{
    public class SetlistDto
    {
        public string EventName { get; set; }

        public string EventLocation { get; set; }

        public string EnsembleName { get; set; }

        public DateTime DateAndTime { get; set; }

        public string Setlist { get; set; }
    }
}
