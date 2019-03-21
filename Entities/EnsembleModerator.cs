using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyGigApi.Entities
{
    public class EnsembleModerator : Request
    {
        public EnsembleModerator()
        {
            Text = $"{UserRequester.FullName} has asked you to moderate {Ensemble.Name}";
        }

        [Required]
        public int EnsembleId { get; set; }

        [ForeignKey("EnsembleId")]
        public Ensemble Ensemble { get; set; }
    }
}