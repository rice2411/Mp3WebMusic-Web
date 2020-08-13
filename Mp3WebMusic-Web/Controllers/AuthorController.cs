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
        public ViewResult AutthorIsDelete()
        {

            return View("~/Views/Dashboard/Author/AuthorIsDelete.cshtml");
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
                                                    $"{Helper.ApiUrl}Api/Author/Add",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Author/Edit")]
        public JsonResult Edit([FromBody] Author model)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Author/Edit",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Author/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}Api/Author/Get/{id}"
                                                );
            return Json(new { result });
        }
        [Route("/Author/Delete/{id}")]
        public JsonResult Delete([FromBody] Author model)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Author/Delete",
                                                    model
                                                );
            return Json(new { result });
        }
        [Route("/Author/Restore/{id}")]
        public JsonResult Restore([FromBody] Author model)
        {
            var result = new Author();
            result = ApiHelper<Author>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}Api/Author/Restore",
                                                    model
                                                );
            return Json(new { result });
        }
    }
}
