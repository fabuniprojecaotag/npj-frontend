package app.web.gprojuridico.service;

import app.web.gprojuridico.model.Perfil;
import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PerfilService {

    private static final String COLLECTION_NAME = "perfis";
    public ResponseModel getAll() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        try {
            ApiFuture<QuerySnapshot> query = usersCollection.get();
            QuerySnapshot querySnapshot = query.get();
            List<Perfil> perfilList = new ArrayList<>();

            for (QueryDocumentSnapshot document : querySnapshot) {
                // Convert Firestore document to your User object
                Perfil perfil = document.toObject(Perfil.class);
                perfil.setDocumentId(document.getId());

                // Check if the user is already in the list
                if (!perfilList.contains(perfil)) {
                    perfilList.add(perfil);
                }
            }

            // Assuming you want to return the perfilList as data in your ResponseModel
            return ResponseModel.success("Success message", perfilList);
        } catch (InterruptedException | ExecutionException e) {
            // Handle any exceptions
            return ResponseModel.failure("Error message", e.getMessage());
        }
    }

  public ResponseEntity<ResponseModel> getPerfilById(String perfilId) {
      Firestore dbFirestore = FirestoreClient.getFirestore();
      DocumentReference perfilDocRef = dbFirestore.collection(COLLECTION_NAME).document(perfilId);

      try {
          System.out.println("Attempting to fetch perfil for ID: " + perfilId);

          DocumentSnapshot perfilSnapshot = perfilDocRef.get().get();

          if (perfilSnapshot.exists()) {
              Perfil perfil = perfilSnapshot.toObject(Perfil.class);
              perfil.setDocumentId(perfilSnapshot.getId());
              System.out.println("Perfil found: " + perfil.toString());

              // Return the result wrapped in a ResponseModel
              return ResponseEntity.ok(ResponseModel.success("Perfil found", perfil));
          } else {
              System.out.println("Perfil not found for ID: " + perfilId);
              // Return null or handle the case where the perfil with the given ID doesn't exist
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseModel.failure("Perfil not found", null));
          }
      } catch (InterruptedException | ExecutionException e) {
          // Handle any exceptions
          System.err.println("Error fetching perfil: " + e.getMessage());
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseModel.failure("Error fetching perfil", null));
      }
  }
}
