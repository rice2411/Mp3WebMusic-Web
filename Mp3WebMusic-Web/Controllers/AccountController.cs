using Microsoft.AspNetCore.Mvc;
using Mp3WebMusic_Web.Ultilities;
using Mp3WebMusic_Web.Models.Account;

namespace Mp3WebMusic_Web.Controllers


{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = new LoginResult();
                var loginRequest = new LoginResult()
                {
                    Email = model.Email,
                    Password = model.Password
                };
                result = ApiHelper<LoginResult>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}Api/Account/Login",
                                                        loginRequest
                                                    );
                if (result.Success)
                {
                    return RedirectToAction("Index","Home");
                }
                ModelState.AddModelError("", result.Message);
                return View();
            }
            return View(model);
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var registerRequest = new RegisterResult()
                {
                    Email = model.Email,
                    Password = model.Password
                };
                var result = new RegisterResult();
                result = result = ApiHelper<RegisterResult>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}Api/Account/Register",
                                                        registerRequest
                                                    );
                if (result.Success)
                {
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", result.Message);
                return View();
            }
            return View(model);
        }

        public IActionResult Logout()
        {
            var result = true;
            return Json(new { result});
        }
    }
}
