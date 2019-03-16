
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MyGigApi.Entities
{
    public class Event
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public DateTime DateAndTime { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public int CreatedByUserId { get; set; }

        [ForeignKey("CreatedByUserId")]
        public User CreatedByUser { get; set; }

        public ICollection<Booking> Ensembles { get; set; }

        public ICollection<PublicEventComment> PublicEventComments { get; set; }

        public ICollection<PrivateEventComment> PrivateEventComments { get; set; }

        public ICollection<EventSetlist> EventSetlists { get; set; }

        public ICollection<EventModerator> Moderators { get; set; }
    }
}
