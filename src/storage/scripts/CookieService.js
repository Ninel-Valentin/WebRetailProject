function GetCookie(name) {
    const cookies = document.cookie;
    return cookies.split(';').find(x => x.split('=').shift() === name)?.split('=').pop() || null;
}

function SetCookie(name, value, expDays) {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expireTime = date.toUTCString();
    const cookieStr = `${name}=${value};expires=${expireTime};path=/`
    document.cookie = cookieStr;
}

function DeleteCookie(name) {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    const expireTime = date.toUTCString();
    const cookieStr = `${name}=;expires=${expireTime};path=/`
    document.cookie = cookieStr;
}

export { GetCookie, SetCookie, DeleteCookie };