package app.web.gprojuridico.service;

import app.web.gprojuridico.model.Assistido;
import app.web.gprojuridico.model.ResponseModel;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AssistidoService {

    private static final String COLLECTION_NAME = "assistidos";

    public ResponseModel getAllAssistidos() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference assistidosCollection = dbFirestore.collection(COLLECTION_NAME);

        try {
            ApiFuture<QuerySnapshot> query = assistidosCollection.get();
            QuerySnapshot querySnapshot = query.get();
            List<Assistido> assistidoList = new ArrayList<>();

            for (QueryDocumentSnapshot document : querySnapshot) {
                Assistido assistido = document.toObject(Assistido.class);
                assistido.setDocumentId(document.getId());

                if (!assistidoList.contains(assistido)) {
                    assistidoList.add(assistido);
                }
            }

            return ResponseModel.success("Assistidos encontrados:", assistidoList);
        } catch (InterruptedException | ExecutionException e) {
            return ResponseModel.failure("Erro ao procurar assistidos:", new ArrayList<>());
        }
    }

    public ResponseModel createAssistido(Assistido assistido) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference assistidosCollection = dbFirestore.collection(COLLECTION_NAME);

        try {
            // Adiciona o assistido ao Firestore
            ApiFuture<DocumentReference> result = assistidosCollection.add(assistido);
            System.out.println("Assistido adicionado com sucesso. ID: " + result.get().getId());

            return ResponseModel.success("Assistido criado com sucesso", Collections.singletonList(assistido));
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Erro ao criar assistido: " + e.getMessage());
            return ResponseModel.failure("Erro ao criar assistido", null);
        }
    }
    public ResponseEntity<ResponseModel<?>> getAssistidoById(String assistidoId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference assistidoDocRef = dbFirestore.collection(COLLECTION_NAME).document(assistidoId);

        try {
            System.out.println("Attempting to fetch assistido for ID: " + assistidoId);

            DocumentSnapshot assistidoSnapshot = assistidoDocRef.get().get();

            if (assistidoSnapshot.exists()) {
                Assistido assistido = assistidoSnapshot.toObject(Assistido.class);
                assert assistido != null;
                assistido.setDocumentId(assistidoSnapshot.getId());
                System.out.println("Assistido found: " + assistido);

                return ResponseEntity.ok(ResponseModel.success("Assistido found", Collections.singletonList(assistido)));
            } else {
                System.out.println("Assistido not found for ID: " + assistidoId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseModel.failure("Assistido not found", null));
            }
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error fetching assistido: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseModel.failure("Error fetching assistido", null));
        }
    }

    // Adicione métodos para criar, editar e deletar assistidos conforme necessário
}

