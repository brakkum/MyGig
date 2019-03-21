using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EventModerator : Request
    {
        public EventModerator()
        {
            Text = $"{UserRequester.FullName} has asked you to moderate the event {Event.Name}";
        }

        [Required]
        public int EventId { get; set; }

        [ForeignKey("EventId")]
        public Event Event { get; set; }
    }
}