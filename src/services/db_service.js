import moment from "moment";

const firebase = require("firebase");
require("firebase/firebase-firestore");

firebase.initializeApp({
  apiKey: "AIzaSyARcO2C-jzRqTZb52_cV2N3gEE9JS28nqE",
  authDomain: "bubbly-app-6ff08.firebaseapp.com",
  databaseURL: "https://bubbly-app-6ff08.firebaseio.com",
  projectId: "bubbly-app-6ff08",
  storageBucket: "bubbly-app-6ff08.appspot.com",
  messagingSenderId: "145455557141",
  appId: "1:145455557141:web:ec9c022d19479204f5fc1c"
});

const db = firebase.firestore();

function getFirstAndLastDay(date) {
  const dt = moment(date),
    y = date.getFullYear(),
    m = date.getMonth();

  const firstDay = new Date(y, m, 1).toISOString();
  const lastDay = new Date(y, m + 1, 0).toISOString();

  return [firstDay, lastDay];
}

export function getSchedule(date) {
  const range = getFirstAndLastDay(date);
  return db
    .collection("schedule")
    .where("date", ">=", range[0])
    .where("date", "<", range[1])
    .get()
    .then(querySnap => querySnap.docs.map(doc => doc.data()))
    .catch(err => console.error(err));
}

export function getCollectionDocuments(collection) {
  return db
    .collection(collection)
    .get()
    .then(querySnap => querySnap.docs.map(doc => doc.data()))
    .catch(ex => console.error(ex));
}
