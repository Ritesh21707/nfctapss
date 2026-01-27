/*************************
  FIREBASE INIT (FIRST)
 *************************/
const firebaseConfig = {
  apiKey: "AIzaSyDeGXhhNJRqqWp4hCtpx3qyQ-sjYaAfCLs",
  authDomain: "nfc-tapss.firebaseapp.com",
  projectId: "nfc-tapss",
  storageBucket: "nfc-tapss.firebasestorage.app",
  messagingSenderId: "669649106295",
  appId: "1:669649106295:web:e145f4a0663cfdc15a5d72"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/*************************
  LOGIN
 *************************/
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  });
}

/*************************
  LOGOUT
 *************************/
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  });
}

/*************************
  AUTH STATE
 *************************/
auth.onAuthStateChanged(user => {
  const userBox = document.getElementById("userBox");
  const userName = document.getElementById("userName");
  const userPhoto = document.getElementById("userPhoto");
  const dashboardLink = document.getElementById("dashboardLink");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (userBox) userBox.style.display = "flex";
    if (userName) userName.innerText = user.displayName;
    if (userPhoto) userPhoto.src = user.photoURL;
    if (dashboardLink) dashboardLink.style.display = "inline-block";
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (userBox) userBox.style.display = "none";
    if (dashboardLink) dashboardLink.style.display = "none";
  }

  if (window.location.pathname.includes("dashboard.html") && !user) {
    window.location.href = "index.html";
  }
});

/*************************
  MOBILE MENU
 *************************/
const menuToggle = document.getElementById("menuToggle");
const navRight = document.querySelector(".nav-right");

if (menuToggle && navRight) {
  menuToggle.addEventListener("click", () => {
    navRight.classList.toggle("active");
  });
}

// Force login before accessing main site
if (
  !user &&
  !window.location.pathname.includes("login.html")
) {
  window.location.href = "login.html";
}
