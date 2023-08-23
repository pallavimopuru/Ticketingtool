using KTS.Service.Interface;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KTS.Models.Common;
using Microsoft.Extensions.Configuration;

namespace KTS.Service.Implementation
{
    public class EmailServices : IEmailServices
    {
        private readonly IConfiguration _emailConfig;
        public EmailServices(IConfiguration configuration)
        {
            _emailConfig = configuration;
        }
        public async Task<ResponseModel<bool>> SendEmail(EmailParam emailParameters)
        {
            try
            {
                var apiKey = _emailConfig.GetValue<string>("EmailConfig:ApiKey");
                var fromEmail = _emailConfig.GetValue<string>("EmailConfig:FromEmail");
                var fromEmailAlias = _emailConfig.GetValue<string>("EmailConfig:FromEmailAlias");
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(fromEmail, fromEmailAlias);
                var subject = emailParameters.EmailSubject;
                var to = new EmailAddress(emailParameters.EmailRecipient);
                var plainTextContent = "Test";
                var mailBody = emailParameters.EmailBody;
                var htmlContent = mailBody;
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

                // if (!string.IsNullOrWhiteSpace(emailParameters.EmailCarbonCopies))
                // {
                //     List<EmailAddress> emailAddresses = new List<EmailAddress>();
                //     foreach (string emailAddress in emailParameters.EmailCarbonCopies.Split(','))
                //     {
                //         emailAddresses.Add(new EmailAddress(emailAddress));
                //     }
                //     msg.AddCcs(emailAddresses);
                // }

                if (!string.IsNullOrWhiteSpace(emailParameters.EmailCarbonCopies))
                {
                    List<EmailAddress> emailAddresses = new List<EmailAddress>();
                    foreach (string emailAddress in emailParameters.EmailCarbonCopies.Split(','))
                    {
                        if (!string.IsNullOrWhiteSpace(emailAddress)
                            && !emailAddress.Equals(emailParameters.EmailRecipient, StringComparison.OrdinalIgnoreCase))
                        {
                            if (!emailAddresses.Contains(new EmailAddress(emailAddress)))
                                emailAddresses.Add(new EmailAddress(emailAddress));
                        }
                    }
                    if (emailAddresses.Count > 0)
                        msg.AddCcs(emailAddresses);
                }

                var response = await client.SendEmailAsync(msg);
                if (response.IsSuccessStatusCode)
                {
                    return new ResponseModel<bool>()
                    {
                        IsError = false,
                        Message = "Email sent successfully",
                        Data = true
                    };
                }
                else
                {
                    return new ResponseModel<bool>()
                    {
                        IsError = true,
                        Message = "Error while sending Email",
                        Data = false
                    };
                }

            }
            catch (Exception ex)
            {
                return new ResponseModel<bool>()
                {
                    IsError = true,
                    Message = "Error while sending Email",
                    Data = false
                };
            }
        }


    }
}
