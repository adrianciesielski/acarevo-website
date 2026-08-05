(() => {
    const consentKey = "acarevo-analytics-consent";
  
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const rejectButton = document.getElementById("cookie-reject");
  
    if (!banner || !acceptButton || !rejectButton) {
      return;
    }
  
    function updateConsent(analyticsConsent) {
      if (typeof gtag === "function") {
        gtag("consent", "update", {
          analytics_storage: analyticsConsent,
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied"
        });
      }
    }
  
    const savedConsent = localStorage.getItem(consentKey);
  
    if (savedConsent === "granted") {
      updateConsent("granted");
    } else if (savedConsent === "denied") {
      updateConsent("denied");
    } else {
      banner.hidden = false;
    }
  
    acceptButton.addEventListener("click", () => {
      localStorage.setItem(consentKey, "granted");
      updateConsent("granted");
      banner.hidden = true;
    });
  
    rejectButton.addEventListener("click", () => {
      localStorage.setItem(consentKey, "denied");
      updateConsent("denied");
      banner.hidden = true;
    });
  })();