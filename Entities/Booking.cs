using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Booking : Request
    {
        public int EventId { get; set; }

        public Event Event { get; set; }

        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }
    }
}
