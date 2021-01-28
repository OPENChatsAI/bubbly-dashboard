import { Api } from "./api";
import firebase from "../config/firebase";

export class EmployeeApi extends Api {
  static endpoint = "EmployeeApi";

  static listenToDetailerPositionById(employeeId, onPositionChanged) {
    return firebase
      .firestore()
      .collection("locations")
      .doc(employeeId)
      .onSnapshot((doc) => {
        onPositionChanged({ employeeId: doc.id, coords: doc.data() });
      });
  }

  static listenToDetailersPositions(onPositionChanged) {
    return firebase
      .firestore()
      .collection("locations")
      .onSnapshot((snap) =>
        onPositionChanged(
          snap.docs.map((doc) => ({ employeeId: doc.id, coords: doc.data() }))
        )
      );
  }
}
