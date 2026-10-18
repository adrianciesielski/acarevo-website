(() => {
  const consentKey = "acarevo-analytics-consent";
  const measurementId = "G-9SXD7DHC29";

  const banner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("cookie-accept");
  const rejectButton = document.getElementById("cookie-reject");

  if (!banner || !acceptButton || !rejectButton) {
    return;
  }

  function loadAnalytics() {
    if (window.acarevoAnalyticsLoaded) {
      return;
    }

    window.acarevoAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  const savedConsent = localStorage.getItem(consentKey);
  const settingsRequested = new URLSearchParams(window.location.search).has("cookie-settings");

  if (settingsRequested) {
    banner.hidden = false;
  } else if (savedConsent === "granted") {
    loadAnalytics();
  } else if (savedConsent !== "denied") {
    banner.hidden = false;
  }

  acceptButton.addEventListener("click", () => {
    localStorage.setItem(consentKey, "granted");
    loadAnalytics();
    banner.hidden = true;
    if (settingsRequested) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  });

  rejectButton.addEventListener("click", () => {
    localStorage.setItem(consentKey, "denied");
    if (window.acarevoAnalyticsLoaded && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
    banner.hidden = true;
    if (window.acarevoAnalyticsLoaded) {
      window.location.replace(window.location.pathname);
    } else if (settingsRequested) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  });
})();
