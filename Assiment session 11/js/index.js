var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var users = JSON.parse(localStorage.getItem('users')) || [];

function signUp() {
   // التحقق من أن جميع الحقول ممتلئة
   if (!signupName.value || !signupEmail.value || !signupPassword.value) {
      alert("Please fill out all the fields.");
      return;
   }

   for (var i = 0; i < users.length; i++) {
      if (users[i].email === signupEmail.value) {
         alert("This email is already registered.");
         return;
      }
   }


   // إنشاء المستخدم الجديد
   var user = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value
   };

   // إضافة المستخدم إلى القائمة وتحديث localStorage
   users.push(user);
   localStorage.setItem('users', JSON.stringify(users));

   alert("Signup successful!");
   clearSignupFields(); // مسح الحقول بعد التسجيل
   console.log(users); // لعرض قائمة المستخدمين الحالية
}

function clearSignupFields() {
   signupName.value = '';
   signupEmail.value = '';
   signupPassword.value = '';
}
// ==================================================
function login() {
   // جلب بيانات المستخدمين من localStorage وتحويلها إلى مصفوفة
   var users = JSON.parse(localStorage.getItem('users')) || [];
   var isAuthenticated = false;

   for (var i = 0; i < users.length; i++) {
      // التحقق من تطابق بيانات تسجيل الدخول
      if (signinEmail.value === users[i].email && signinPassword.value === users[i].password) {
         isAuthenticated = true;
         window.location.href = "home.html"; // الانتقال إلى صفحة أخرى بعد تسجيل الدخول
         document.getElementById('usernamehome').textContent = `Welcome, ${users[i].name}`;
         alert(`Welcome, ${users[i].name}`);

         break;
      }
   }

   if (!isAuthenticated) {
      document.getElementById('incorrect').textContent = "Incorrect email or password.";
      document.getElementById('incorrect').style.color = "red";
   }
}
