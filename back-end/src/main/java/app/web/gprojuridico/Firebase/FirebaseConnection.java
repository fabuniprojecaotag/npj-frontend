package app.web.gprojuridico.Firebase;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
@Service
public class FirebaseConnection {

    public static void  initialization(){
        FileInputStream serviceAccount = null;

        {
            try {
                serviceAccount = new FileInputStream("./firebaseAccountKey.json");


                GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(credentials)
                        .build();
                FirebaseApp.initializeApp(options);

                Firestore db = FirestoreClient.getFirestore();

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

}
