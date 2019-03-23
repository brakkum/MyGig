
namespace MyGigApi.DTOs
{
    public class BookingDto : RequestDto
    {
        public int EventId { get; set; }

        public int EnsembleId { get; set; }
    }
}