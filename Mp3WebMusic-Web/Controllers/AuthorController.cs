using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Models.Author;
using Mp3WebMusic_Web.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mp3WebMusic_Web.Controllers
{
    public class AuthorController : Controller
    {
        public ViewResult Search()
        {

            return View("~/Views/Home/AuthorList.cshtml");
        }
        public ViewResult AuthorDetail(int id)
        {
            var author = new Author()
            {
                AuthorID = id
            };
            return View("~/Views/Dashboard/Author/AuthorDetail.cshtml", author);
        }
        public ViewResult Author()
        {

            return View("~/Views/Dashboard/Author/Author.cshtml");
        }
  
        [Route("/Author/GetsAuthorIsNotDelete")]
        public JsonResult GetsAuthorIsNotDelete()
        {
            var authors = new List<Author>();
            authors = ApiHelper<List<Author>>.HttpGetAsync($"{Helper.ApiUrl}Api/Author/GetsAuthorIsNotDelete");
            var json = Json(new { authors });
            return json;
        }
        [Route("/Author/GetsAuthorIsDelete")]
        public JsonResult GetsAuthorIsDelete()
        {
            var authors = new List<Author>();
            authors = ApiHelper<List<Author>>.HttpGetAsync($"{Helper.ApiUrl}Api/Author/GetsAuthorIsDelete");
            var json = Json(new { authors });
            return json;
        }
        [Route("/Author/Add")]
        public JsonResult Add([FromBody] Author model)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Author/AddAuthor",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Author/Edit")]
        public JsonResult Edit([FromBody] Author model)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Author/EditAuthor",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Author/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Author/GetAuthorById/{id}"
                                                );
            return Json(new { result });
        }
        [Route("/Author/Delete/{id}")]
        public JsonResult Delete(int id)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Author/DeleteAuthor/{id}",
                                                       "post"
                                                );
            return Json(new { result });
        }
        [Route("/Author/Restore/{id}")]
        public JsonResult Restore(int id)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Author/RestoreAuthor/{id}",
                                                    "post"
                                                );
            return Json(new { result });
        }
    }
}
