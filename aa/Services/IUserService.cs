using Microsoft.EntityFrameworkCore;
using aa.Models;
using aa.Views;
using Azure;

namespace aa.Services
{
    public interface IUserService
    {   
        public IEnumerable<UserDto> Get();
        public UserDto Get(int id);
        public UserDto Create(UserDto userdto);
        public UserDto Update(int id, UserDto userdto);
        public UserDto Delete(int id);
    }
}
