package com.francids.escruta.backend.services;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileTextExtractionService {
    public String extractTextFromFile(MultipartFile file) {
        try {
            var documents = getDocuments(file);

            var content = new StringBuilder();
            for (var document : documents) {
                content.append(document.getFormattedContent()).append("\n\n");
            }

            return content.toString().trim();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from file: " + e.getMessage(), e);
        }
    }

    private static List<Document> getDocuments(MultipartFile file) throws IOException {
        var resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        TikaDocumentReader reader = new TikaDocumentReader(resource);
        var documents = reader.get();

        if (documents.isEmpty()) {
            throw new RuntimeException("No text content could be extracted from the file");
        }
        return documents;
    }

    public boolean isSupportedFileType(String contentType) {
        if (contentType == null) {
            return false;
        }

        return contentType.equals("application/pdf") ||                                                              // PDF
                contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||   // DOCX
                contentType.equals("text/plain") ||                                                                 // TXT
                contentType.equals("text/markdown");                                                                // Markdown
    }
}
