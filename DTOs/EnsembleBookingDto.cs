using System;

namespace MyGigApi.DTOs
{
    public class EnsembleBookingDto
    {
        public int BookingId { get; set; }

        public int EventId { get; set; } 

        public string EventName { get; set; }

        public string EventLocation { get; set; }

        public DateTime DateAndTime { get; set; }

        public string EnsembleName { get; set; }

        public bool UserIsMod { get; set; }

        // newline separate string of songs
        public string Setlist { get; set; }
    }
}