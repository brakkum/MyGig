using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Ensemble
    {
        [Key]
        [Column("EnsembleId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnsembleId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        public string Name { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public ICollection<EnsembleMember> Members { get; set; }

        // TODO: Make Ensemble creator initial moderator
        public ICollection<EnsembleModerator> Moderators { get; set; }

        public ICollection<Booking> Bookings { get; set; }

        public EnsembleStatus Status { get; set; }
    }

    public enum EnsembleStatus
    {
        Inactive = 0,
        Active = 1
    }
}