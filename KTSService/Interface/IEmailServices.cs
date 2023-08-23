using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Service.Interface
{
    public interface IEmailServices
    {
        Task<ResponseModel<bool>> SendEmail(EmailParam emailParameters);
    }
}
