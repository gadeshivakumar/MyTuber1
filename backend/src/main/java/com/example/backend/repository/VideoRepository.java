package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Video;
@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
}
