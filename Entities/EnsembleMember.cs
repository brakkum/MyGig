using System;
using System.ComponentModel.DataAnnotations;

namespace MyGigApi.Entities
{
    public class EnsembleMember : Request
    {
        public EnsembleMember()
        {
            Text = $"{UserRequester.FullName} has asked you to join ${Ensemble.Name}";
        }

        [Required]
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }

        [Required]
        public DateTime JoinedOn { get; set; }
    }
}