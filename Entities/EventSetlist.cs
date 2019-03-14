using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EventSetlist
    {
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }

        public int SetlistId { get; set; }

        [ForeignKey("SetlistId")]
        public Setlist Setlist { get; set; }

        [Required]
        public int EventSetlistOrder { get; set; }
    }
}