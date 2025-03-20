namespace Job_Tracker_Application.Models
{
    public interface IAuthService
    {
        Task<string> Authenticate(string username, string password);
    }
}
