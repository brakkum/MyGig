using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class Booking
    {
        [Required]
        public int EventId { get; set; }

        public Event Event { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }

        [Required]
        public DateTime BookedOn { get; set; }
    }
}