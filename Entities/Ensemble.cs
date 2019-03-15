using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class Ensemble
    {
        public Ensemble()
        {
            IsActive = true;
        }

        [Key]
        [Column("EnsembleId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnsembleId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(500)]
        public string Name { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public ICollection<EnsembleMember> Members { get; set; }

        public ICollection<EnsembleModerator> Moderators { get; set; }

        public ICollection<Booking> Bookings { get; set; }
    }
}