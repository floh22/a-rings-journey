import { getCookie, setMaxAgeCookie } from "./cookies"

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;

  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`

    setMaxAgeCookie('count', counter.toString());
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  getCookie('count') && setCounter(parseInt(getCookie('count')))
}
