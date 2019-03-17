using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EnsembleModerator
    {
        [Required]
        public int EnsembleId { get; set; }

        [ForeignKey("EnsembleId")]
        public Ensemble Ensemble { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime AssignedAt { get; set; }

        public EnsembleModeratorStatus Status { get; set; }
    }

    public enum EnsembleModeratorStatus
    {
        Pending = 0,
        Active = 1,
        Declined = 2,
        Inactive = 3
    }
}