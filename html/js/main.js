function openPrivacyPolicy(){
  window.open('/privacypolicy', '_blank', 'width=800,height=800,left=' + (screen.width - 800) / 2 + ',top=' + (screen.height - 800) / 2);
}
function openTermsOfService(){
  window.open('/termsofservice', '_blank', 'width=800,height=800,left=' + (screen.width - 800) / 2 + ',top=' + (screen.height - 800) / 2);
}
if(/Mobi|Android/i.test(navigator.userAgent)){
  window.location.href = "/mobile";
} else {
  if(/Lapi/i.test(navigator.userAgent)){
    window.location.href = "/";
  }
}