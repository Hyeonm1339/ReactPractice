import {redirect} from "react-router-dom";


export function getTokenDuration() {
    const storedExpirationData = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationData);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration
}


export function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null
    }
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();
    //토큰이 없다면 인증창으로 리다이렉트
    if (!token) return redirect('/auth')

    //그외는 널을 리턴해 오류 방지.
    return null;
}