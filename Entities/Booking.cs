using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Booking : Request
    {
        public Booking()
        {
            Text = $"{UserRequester.FullName} has requested {Ensemble.Name} to perform at {Event.Name}";
        }

        [Required]
        public int EventId { get; set; }

        public Event Event { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }
    }
}
