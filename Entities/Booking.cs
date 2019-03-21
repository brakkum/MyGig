using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Booking : Request
    {
        [Required]
        public int EventId { get; set; }

        public Event Event { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }
    }
}
