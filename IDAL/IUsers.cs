using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace IDAL
{
    public interface IUsers
    {
        void AddUsers(Users users);
        Users Denglu(string UserName, string Password);
        Users GetUsersByName(string  UserName);
        void UpdateUserInfo(Users users);
       
        IEnumerable<Users> Search(string search);


        Users GetUserByID(int UserID);
    }
}
