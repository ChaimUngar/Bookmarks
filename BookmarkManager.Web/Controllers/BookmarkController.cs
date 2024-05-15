using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("add-bookmark")]
        [Authorize]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BoookmarkRepo(_connectionString);
            repo.AddBookmark(bookmark);
        }

        [HttpGet("get-bookmarks")]
        [Authorize]
        public List<Bookmark> GetBookmarksForUser(int id)
        {
            var repo = new BoookmarkRepo(_connectionString);
            return repo.GetBookmarksForUser(id);
        }

        [HttpPost("delete")]
        [Authorize]
        public void DeleteBookmark(int id)
        {
            var repo = new BoookmarkRepo(_connectionString);
            repo.Delete(id);
        }

        [HttpPost("update")]
        [Authorize]
        public void UpdateBookmark(UpdateVM vm)
        {
            var repo = new BoookmarkRepo(_connectionString);
            repo.Update(vm.Id, vm.Title);
        }

        [HttpGet("get-top-five")]
        public List<Bookmark> GetTopFive()
        {
            var repo = new BoookmarkRepo(_connectionString);

        }

    }
}
