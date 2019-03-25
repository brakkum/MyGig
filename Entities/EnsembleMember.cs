using System;

namespace MyGigApi.Entities
{
    public class EnsembleMember : Request
    {
        public int EnsembleId { get; set; }

        public Ensemble Ensemble { get; set; }
    }
}