using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EnsembleModerator
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnsembleModeratorId { get; set; }

        [Required]
        public int UserIdRequester { get; set; }

        [ForeignKey("UserIdRequester")]
        public User UserRequester { get; set; }

        [Required]
        public int UserIdRecipient { get; set; }

        [ForeignKey("UserIdRecipient")]
        public User UserRecipient { get; set; }

        public RequestStatus Status { get; set; }

        public DateTime Timestamp { get; set; }

        public string Text { get; set; }

        public DateTime? ConfirmedAt { get; set; }

        // Unique to EnsembleModerator below
        public int EnsembleId { get; set; }

        [ForeignKey("EnsembleId")]
        public Ensemble Ensemble { get; set; }
    }
}