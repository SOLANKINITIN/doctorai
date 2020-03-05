import packageJson from "../../package.json";

const config = {
  get PUBLIC_URL() {
    return process.env.PUBLIC_URL;
  },
  get SERVER_URL() {
    return process.env.REACT_APP_SERVER_URL;
  },
  get DEBUG() {
    return process.env.NODE_ENV !== "production";
  },
  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
  get VERSION() {
    return packageJson.version;
  },
  get GOOGLE_KEY() {
    return "AIzaSyC_W2QaRiFEj4HU-F_uyAlN2oUXKcBoPZw";
  },
  get MAP_URL() {
    return `https://maps.google.com/maps/api/geocode/json?key=AIzaSyC_W2QaRiFEj4HU-F_uyAlN2oUXKcBoPZw`;
  },
  get FIREBASE_CONFIG(){
    return {
      apiKey: "AIzaSyBde_gv14KMZMcErnQJbNbJXdD0hxXAHdw",
      authDomain: "portfolio-53d8e-eca0e.firebaseapp.com",
      databaseURL: "https://portfolio-53d8e-eca0e.firebaseio.com",
      projectId: "portfolio-53d8e",
      storageBucket: "portfolio-53d8e.appspot.com",
      messagingSenderId: "402163669291",
      appId: "1:402163669291:web:f5154820d54d79a9b88d6e"
    };
  }
};

export default config;
