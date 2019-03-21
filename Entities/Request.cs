using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public abstract class Request
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestId { get; set; }

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

        protected string Text { get; set; }
    }

    public enum RequestStatus
    {
        Pending = 0,
        Accepted = 1,
        Denied = 2,
        Inactive = 3
    }
}
