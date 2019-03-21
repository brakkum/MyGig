using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class EnsembleMember : Request
    {
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }

        [Required]
        public DateTime JoinedOn { get; set; }
    }
}