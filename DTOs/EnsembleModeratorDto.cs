namespace MyGigApi.DTOs
{
    public class EnsembleModeratorDto : RequestDto
    {
        public EnsembleModeratorDto()
        {
            AcceptRoute = "/route";
            DenyRoute = "/route";
        }
    }
}