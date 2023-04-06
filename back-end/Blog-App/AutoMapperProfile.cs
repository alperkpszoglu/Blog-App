using AutoMapper;
using Blog_App.Models;

namespace Blog_App
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
