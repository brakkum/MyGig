using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class BookingSetlist
    {
        public int BookingId { get; set; }

        [ForeignKey("BookingId")]
        public Booking Booking { get; set; }

        public int SetlistId { get; set; }

        [ForeignKey("SetlistId")]
        public Setlist Setlist { get; set; }
    }
}