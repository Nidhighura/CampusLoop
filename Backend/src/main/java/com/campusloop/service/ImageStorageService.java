package com.campusloop.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.campusloop.exception.BadRequestException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageStorageService {

    private static final int MAX_IMAGE_COUNT = 5;

    private final Cloudinary cloudinary;

    @Value("${cloudinary.cloud-name:}")
    private String cloudName;

    @Value("${cloudinary.folder:campusloop/products}")
    private String folder;

    public List<String> uploadImages(MultipartFile[] files) {
        List<MultipartFile> validFiles = extractValidFiles(files);
        if (validFiles.isEmpty()) {
            return Collections.emptyList();
        }
        if (!StringUtils.hasText(cloudName)) {
            throw new BadRequestException("Cloudinary is not configured. Provide imageUrls or configure Cloudinary.");
        }
        if (validFiles.size() > MAX_IMAGE_COUNT) {
            throw new BadRequestException("You can upload at most " + MAX_IMAGE_COUNT + " images per product.");
        }

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : validFiles) {
            validateImage(file);
            try {
                Map<?, ?> result = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap(
                                "folder", folder,
                                "resource_type", "image",
                                "public_id", UUID.randomUUID().toString(),
                                "overwrite", false));
                imageUrls.add(String.valueOf(result.get("secure_url")));
            } catch (IOException ex) {
                throw new BadRequestException("Failed to upload image: " + file.getOriginalFilename());
            }
        }
        return imageUrls;
    }

    private List<MultipartFile> extractValidFiles(MultipartFile[] files) {
        if (files == null || files.length == 0) {
            return Collections.emptyList();
        }

        List<MultipartFile> validFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file != null && !file.isEmpty()) {
                validFiles.add(file);
            }
        }
        return validFiles;
    }

    private void validateImage(MultipartFile file) {
        String contentType = file.getContentType();
        if (!StringUtils.hasText(contentType) || !contentType.startsWith("image/")) {
            throw new BadRequestException("Only image files are allowed.");
        }
    }
}
