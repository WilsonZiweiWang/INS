import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';

//For a well-encapsulated Firebase module,define a index.js file in our Firebase folder that exports all necessary functionalities

export default Firebase;
export { FirebaseContext, withFirebase };

//The Firebase Context from the Firebase module (folder) is used to provide a Firebase instance to the entire application 