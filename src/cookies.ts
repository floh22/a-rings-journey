export function setMaxAgeCookie(name: string, value: string, maxAge: number = 1707109200) {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/`;
}

export function getCookie(name: string) {
    let fullName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(fullName) == 0) {
        return c.substring(fullName.length, c.length);
      }
    }
    return "";
  }


export function removeCookie(name: string) {
    document.cookie = `${name}=;max-age=0`;
}