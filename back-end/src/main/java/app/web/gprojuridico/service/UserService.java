package app.web.gprojuridico.service;
import app.web.gprojuridico.model.Credentials;
import app.web.gprojuridico.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;


@Service
public class UserService {
    private static final String COLLECTION_NAME = "acesso";
    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        // Verificar se nome e email sao unicos
        Query emailQuery = dbFirestore.collection(COLLECTION_NAME).whereEqualTo("email", user.getEmail());
        QuerySnapshot emailQuerySnapshot = emailQuery.get().get();

        Query nameQuery = dbFirestore.collection(COLLECTION_NAME).whereEqualTo("name", user.getNome());
        QuerySnapshot nameQuerySnapshot = nameQuery.get().get();

        if (!emailQuerySnapshot.isEmpty()) {
            // Email ja cadastrado
            return "Email já cadastrado";
        } else if (!nameQuerySnapshot.isEmpty()) {
            // Nome ja cadastrado
            return "Nome já cadastrado";
        } else {
            // Dados unicos? Incremento id e salvo
            user.setToken(null);

            // Pegar e incremtar id
            Query lastUserQuery = dbFirestore.collection(COLLECTION_NAME).orderBy("id", Query.Direction.DESCENDING).limit(1);
            QuerySnapshot lastUserQuerySnapshot = lastUserQuery.get().get();

            int lastUserId = 0;

            if (!lastUserQuerySnapshot.isEmpty()) {
                lastUserId = Objects.requireNonNull(lastUserQuerySnapshot.getDocuments().get(0).getLong("id")).intValue();
            }

            int newUserId = lastUserId + 1;
            user.setId(newUserId);

            DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document();
            ApiFuture<WriteResult> collectionApiFuture = documentReference.set(user);

            try {
                return "Criado com sucesso\nData da ação: " + collectionApiFuture.get().getUpdateTime().toString();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
    public List<User> getAllUsers() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        try {
            ApiFuture<QuerySnapshot> query = usersCollection.get();
            QuerySnapshot querySnapshot = query.get();
            List<User> userList = new ArrayList<>();

            for (QueryDocumentSnapshot document : querySnapshot) {
                // Convert Firestore document to your User object
                User user = document.toObject(User.class);
                userList.add(user);
            }

            return userList;
        } catch (InterruptedException | ExecutionException e) {
            // Handle any exceptions
            throw new RuntimeException("Erro ao retornar usuarios do fb: " + e.getMessage(), e);
        }
    }
    public User findUserByEmail(String email){
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        // Use whereEqualTo to query for the user by email
        List<QueryDocumentSnapshot> matchingUsers;
        try {
            matchingUsers = usersCollection.whereEqualTo("email", email).get().get().getDocuments();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }

        if (!matchingUsers.isEmpty()) {
            // Assuming email is unique, return the first matching user
            DocumentSnapshot userDocument = matchingUsers.get(0);
            return userDocument.toObject(User.class);
        } else {
            return null; // User not found
        }
    }
    public User findUserByEmailAndPassword(Credentials user) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        User foundUser = null;
        System.out.println("Credentials");
        System.out.println(user.getLogin());

        // Extract email and password from the user object
        String email = user.getLogin();
        String password = user.getPassword();

        // Query Firestore to find a user with matching email and password
        List<QueryDocumentSnapshot> matchingUsers = null;
        try {
            matchingUsers = usersCollection
                    .whereEqualTo("email", email)
                    .whereEqualTo("senha", password)
                    .get().get().getDocuments();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }

        if (!matchingUsers.isEmpty()) {
            // Assuming email and password combination is unique, return the first matching user
            foundUser = matchingUsers.get(0).toObject(User.class);
        }

        if (foundUser == null) {
            throw new RuntimeException("No user found with the provided email and password.");
        }

        return foundUser;
    }
}
