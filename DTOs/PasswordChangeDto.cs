namespace MyGigApi.DTOs
{
    public class PasswordChangeDto
    {
        public string OldPassword { get; set; }

        public string OldPasswordConfirm { get; set; }

        public string NewPassword { get; set; }
    }
}