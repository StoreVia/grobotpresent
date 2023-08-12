if (/Mobi|Android/i.test(navigator.userAgent)) {
  window.location.href = "/mobile";
} else {
  if(/Lapi/i.test(navigator.userAgent)){
    window.location.href = "/";
  }
}