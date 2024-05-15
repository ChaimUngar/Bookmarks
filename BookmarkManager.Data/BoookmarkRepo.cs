using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BoookmarkRepo
    {
        private readonly string _connectionString;
        public BoookmarkRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBookmark(Bookmark bookmark)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public List<Bookmark> GetBookmarksForUser(int id)
        {
            var context = new BookmarkDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void Delete(int id)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public void Update(int id, string title)
        {
            var context = new BookmarkDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        //public List<TopBookmarkLink> GetTopFive()
        //{
        //    var context = new BookmarkDataContext(_connectionString);
        //    List<TopBookmarkLink> urls = context.Bookmarks.FromSqlRaw
        //        ($"SELECT TOP 5 Url, COUNT(url) AS 'Count' FROM Bookmarks GROUP BY Url ORDER BY Count DESC").
        //        Select(b => new TopBookmarkLink { Url = b.Url, Count = b.Count }).
        //        ToList();

        //}
    }
}
