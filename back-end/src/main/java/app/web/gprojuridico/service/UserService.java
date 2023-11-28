package app.web.gprojuridico.service;
import app.web.gprojuridico.model.Credentials;
import app.web.gprojuridico.model.Perfil;
import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import at.favre.lib.crypto.bcrypt.BCrypt;

@Service
public class UserService {
    private static final String COLLECTION_NAME = "acesso";
    public String create(User user) throws ExecutionException, InterruptedException {
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

            String pw_hash = BCrypt.withDefaults().hashToString(12,user.getSenha().toCharArray());
            user.setSenha(pw_hash);

            System.out.println(pw_hash);
            System.out.println(user.getSenha());


            DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document();
            ApiFuture<WriteResult> collectionApiFuture = documentReference.set(user);

            try {
                return "Criado com sucesso\nData da ação: " + collectionApiFuture.get().getUpdateTime().toString();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void deleteUserById(String documentId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        DocumentReference documentReference = usersCollection.document(documentId);

        ApiFuture<WriteResult> writeResult = documentReference.delete();

        try {
            writeResult.get();
            System.out.println("User with ID " + documentId + " successfully deleted.");
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting user: " + e.getMessage());
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
    public User findUserByEmailAndPassword(Credentials user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);
        CollectionReference perfisCollection = dbFirestore.collection("perfis");

        User foundUser = null;

        // Extract email and password from the user object
        String email = user.getLogin();
        String password = user.getPassword();

        // Query Firestore to find a user with matching email and password
        List<QueryDocumentSnapshot> matchingUsers;
        try {
            matchingUsers = usersCollection
                    .whereEqualTo("email", email)
                    .get().get().getDocuments();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }

        if (!matchingUsers.isEmpty()) {
            // Assuming email and password combination is unique, return the first matching user
            System.out.println(matchingUsers.get(0));

            foundUser = matchingUsers.get(0).toObject(User.class);
            foundUser.setDocumentId(matchingUsers.get(0).getId());

            // Retrieve perfil data based on perfil_id
            System.out.println(foundUser.toString());

            String perfilId = foundUser.getPerfil_id();
            System.out.println(perfilId);

            if (perfilId != null) {
                DocumentSnapshot perfilSnapshot;
                perfilSnapshot = perfisCollection.document(perfilId).get().get();
                if (perfilSnapshot.exists()) {
                    // Assuming you have a Perfil class, adjust accordingly
                    Perfil perfil = perfilSnapshot.toObject(Perfil.class);
                    foundUser.setPerfil(perfil);
                } else {
                    throw new RuntimeException("Perfil not found for the user.");
                }
            }
        }

        if (foundUser == null) {
            throw new RuntimeException("No user found with the provided email and password.");
        }

        BCrypt.Result isThePhRight = BCrypt.verifyer().verify(user.getPassword().toCharArray(), foundUser.getSenha());
        if (isThePhRight.verified) {
            return foundUser;
        } else {
            throw new RuntimeException("A Senha do usuário incorreta");
        }
    }

    public ResponseModel toggleUserStatus(String documentId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        try {
            DocumentReference userDocument = dbFirestore.collection(COLLECTION_NAME).document(documentId);
            ApiFuture<DocumentSnapshot> documentSnapshot = userDocument.get();

            if (!documentSnapshot.get().exists()) {
                return ResponseModel.failure("User not found.", null);
            }

            String currentStatus = documentSnapshot.get().getString("status");
            String newStatus = "Ativo".equals(currentStatus) ? "Inativo" : "Ativo";

            ApiFuture<WriteResult> updateResult = userDocument.update("status", newStatus);
            updateResult.get();

            // Include additional data if needed, e.g., updated status
            return ResponseModel.success("User status updated successfully.", newStatus);
        } catch (Exception e) {
            return ResponseModel.failure("Error updating user status: " + e.getMessage(), null);
        }
    }
    public List<User> MogetAllUsers() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);
        CollectionReference perfisCollection = dbFirestore.collection("perfis");

        try {
            ApiFuture<QuerySnapshot> query = usersCollection.get();
            QuerySnapshot querySnapshot = query.get();
            List<User> userList = new ArrayList<>();

            for (QueryDocumentSnapshot userDocument : querySnapshot) {
                // Convert Firestore document to your User object
                User user = userDocument.toObject(User.class);
                user.setDocumentId(userDocument.getId());

                // Retrieve perfil data based on perfil_id
                String perfilId = user.getPerfil_id();
                if (perfilId != null) {
                    DocumentSnapshot perfilSnapshot = perfisCollection.document(perfilId).get().get();
                    if (perfilSnapshot.exists()) {
                        // Assuming you have a Perfil class, adjust accordingly
                        Perfil perfil = perfilSnapshot.toObject(Perfil.class);
                        user.setPerfil(perfil);
                    } else {
                        throw new RuntimeException("Perfil not found for the user.");
                    }
                }

                // Check if the user is already in the list
                if (!userList.contains(user)) {
                    userList.add(user);
                }
            }

            return userList;
        } catch (InterruptedException | ExecutionException e) {
            // Handle any exceptions
            throw new RuntimeException("Erro ao retornar usuarios do fb: " + e.getMessage(), e);
        }
    }


    public List<User> getAllUsers(String nome) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection(COLLECTION_NAME);

        try {
            // Create a query with the filter on the "nome" field
            Query query = usersCollection.whereEqualTo("nome", nome);

            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            List<User> userList = new ArrayList<>();

            for (QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
                // Convert Firestore document to your User object
                User user = document.toObject(User.class);
                user.setDocumentId(document.getId());
                userList.add(user);
            }

            return userList;
        } catch (InterruptedException | ExecutionException e) {
            // Handle any exceptions
            throw new RuntimeException("Erro ao retornar usuarios do fb: " + e.getMessage(), e);
        }
    }
}
