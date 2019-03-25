using System.ComponentModel.DataAnnotations.Schema;
using MyGigApi.Entities;

namespace MyGigApi.DTOs
{
    public class BookingSetlistDto
    {
        public int SetlistId { get; set; }

        public Setlist Setlist { get; set; }

        public int BookingId { get; set; }

        public Booking Booking { get; set; }
    }
}