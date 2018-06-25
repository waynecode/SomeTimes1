using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DALFactory;
using IDAL;
using Models;


namespace BLL
{
   public class UsersManager
    {
        IUsers iusers = DataAccess.CreateUsers();
        public void AddUsers(Users users)
        {
            iusers.AddUsers(users);
        }

        public IEnumerable<Users> Search(string search)
        {
            var users = iusers.Search(search);
            return users;
        }
       
        public Users GetUsersByName(string UserName)
        {
            var users = iusers.GetUsersByName(UserName);
            return users;
        }

        public void UpdateUsers(Users users)
        {
            iusers.UpdateUserInfo(users);
        }
        public Users Denglu(string UserName, string Password)
        {
            var users = iusers.Denglu(UserName, Password);
            return users;
        }

        public Users GetUserByID(int UserID)
        {
            return iusers.GetUserByID(UserID);
        }
    }
}
