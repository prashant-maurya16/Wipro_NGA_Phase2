using Job_Tracker_Application.Models;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Job_Tracker_Application.Middelware
{
    public class GenrateMail
    {
        private readonly EmailSettings _emailSettings;

        public GenrateMail(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public void MailInfo(string toEmail, string subject, string body)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(_emailSettings.SenderEmail);
                    mail.To.Add(toEmail);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = false;

                    using (SmtpClient smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port))
                    {
                        smtp.Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Email sending failed: " + ex.Message);
            }
        }
    }
}
