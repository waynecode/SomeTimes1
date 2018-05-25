using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IDAL;
using Models;


namespace DAL
{
    public class SqlUsers : IUsers
    {
        FoodsEntities db = DbContextFactory.CreateDbContext();
        public void AddUsers(Users users)
        {
            db.Users.Add(users);
            db.SaveChanges();
        }
        public IEnumerable<Users> Search(string search)
        {
            var userInfo = from po in db.Users
                           where po.UserName.Contains(search) || po.UserID.Equals(search)
                           select po;
            return userInfo.ToList();
        }
       
       
        public void UpdateUserInfo(Users users)
        {
            db.Entry(users).State = EntityState.Modified;
            db.SaveChanges();
        }
        public Users Denglu(string UserName, string Password)
        {
            var users = db.Users.Where(u => u.UserName == UserName)
                .Where(u => u.Password == Password).FirstOrDefault();
            return users;
        }
        public Users GetUsersByName(string  UserName)
        {
            Users users = db.Users.Find(UserName);
            return users;
        }
       
        
    }
}
