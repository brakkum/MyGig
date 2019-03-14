using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class EnsembleMember
    {
        public EnsembleMember()
        {
            IsCurrent = true;
        }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }

        [Required]
        public DateTime JoinedOn { get; set; }

        public bool IsCurrent { get; set; }
    }
}