var cookiedata = document.cookie;

if (cookiedata.indexOf('kakao_login=done') < 0) {
    createLoginKakao();
} else {
    createLogoutKakao();
    document.getElementById('start_btn').style.display = 'block';
}

function setCookie(name, value, expired) {
    var date = new Date();
    date.setHours(date.getHours() + expired);
    var expried_set = 'expries=' + date.toGMTString();
    document.cookie = name + '=' + value + '; path=/;' + expried_set + ';';
}

function getCookie(name) {
    var nameofCookie = name + '=';
    var x = 0;
    while (x <= document.cookie.length) {
        var y = x + nameofCookie.length;
        if (document.cookie.substring(x, y) == nameofCookie) {
            if ((endofCookie = document.cookie.indexOf(';', y)) == -1) endofCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endofCookie));
        }
        x = document.cookie.indexOf(' ', x) + 1;
        if (x == 0) break;
    }

    return '';
}

function loginWithKakao() {
    Kakao.Auth.cleanup();
    Kakao.Auth.login({
        persistAccessToken: true,
        persistRefreshToken: true,
        success: function (authObj) {
            setCookie('kakao_login', 'done', 1); // 쿠키생성 (로그인)
            //alert(cookiedata);
            createLogoutKakao();
            window.location.href = '../index.html';
        },
        fail: function (err) {
            alert(JSON.stringify(err));
        },
    });
}

function logoutWithKakao() {
    Kakao.Auth.logout();
    alert('Logout Success!');
    setCookie('kakao_login', '', -1); // 쿠키삭제 (로그아웃)
    //deleteCookie( "kakao_login" ); 쿠키삭제 다른 방법
    createLoginKakao();
    window.location.href = '../index.html';
}

function createLoginKakao() {
    var login_btn = '<a href="javascript:loginWithKakao()"><h2>Login</h2></a>';
    document.getElementById('kakao_btn_changed').innerHTML = login_btn;
}

function createLogoutKakao() {
    var login_btn = '<a href="javascript:logoutWithKakao()"><h2>Logout</h2></a>';
    document.getElementById('kakao_btn_changed').innerHTML = login_btn;
}
