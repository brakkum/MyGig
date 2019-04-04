
namespace MyGigApi.DTOs
{
    public class BookingDto : RequestDto
    {
        public int BookingId { get; set; }

        public int EventId { get; set; }

        public int EnsembleId { get; set; }

        // newline separate string of songs
        public string Setlist { get; set; }
    }
}