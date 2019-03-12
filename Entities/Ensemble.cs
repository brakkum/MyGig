using System;
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

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("EnsembleId")]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        // TODO: Add Users field for members
    }
}