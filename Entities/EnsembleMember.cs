using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class EnsembleMember
    {
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }

        [Required]
        public DateTime JoinedOn { get; set; }

        public EnsembleMemberStatus Status { get; set; }
    }

    public enum EnsembleMemberStatus
    {
        Pending = 0,
        Active = 1,
        Declined = 2,
        Inactive = 3
    }
}