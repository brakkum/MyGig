using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EnsembleModerator
    {
        public EnsembleModerator()
        {
            IsActive = true;
        }

        [Required]
        public int EnsembleId { get; set; }

        [ForeignKey("EnsembleId")]
        public Ensemble Ensemble { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime AssignedAt { get; set; }

        public bool IsActive { get; set; }
    }
}