using System;

namespace MyGigApi.DTOs
{
    public class ConnectionDto : RequestDto
    {
        public ConnectionDto()
        {
            AcceptRoute = "/route";
            DenyRoute = "/route";
        }
    }
}
