namespace MyGigApi.DTOs
{
    public class EnsembleMemberDto : RequestDto
    {
        public EnsembleMemberDto()
        {
            AcceptRoute = "/route";
            DenyRoute = "/route";
        }
    }
}