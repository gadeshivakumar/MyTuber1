package com.example.backend.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.models.Video;
import com.example.backend.repository.VideoRepository;

import jakarta.persistence.criteria.Path;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    @Autowired
    private VideoRepository videoRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("video") MultipartFile video,
            @RequestParam("thumbnail") MultipartFile thumbnail) {

        try {
            // Ensure upload directory exists
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Save video file
            String videoFileName = System.currentTimeMillis() + "_" + video.getOriginalFilename();
            Path videoPath = Paths.get(UPLOAD_DIR, videoFileName);
            video.transferTo(videoPath);

            // Save thumbnail file
            String thumbnailFileName = System.currentTimeMillis() + "_" + thumbnail.getOriginalFilename();
            Path thumbnailPath = Paths.get(UPLOAD_DIR, thumbnailFileName);
            thumbnail.transferTo(thumbnailPath);

            // Save video metadata in the database
            Video newVideo = new Video();
            newVideo.setTitle(title);
            newVideo.setDescription(description);
            newVideo.setVideoPath(videoFileName);
            newVideo.setThumbnailPath(thumbnailFileName);
            videoRepository.save(newVideo);

            return ResponseEntity.ok("Video uploaded successfully!");

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }
}
